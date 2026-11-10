import {firebaseConfig} from './auth-config.mjs';

const sdkBase = 'https://www.gstatic.com/firebasejs/12.19.0/';
const accountModes = {
  login: {title: '이메일로 로그인', action: '로그인', autocomplete: 'current-password'},
  signup: {title: '회원가입', action: '가입하고 인증 메일 받기', autocomplete: 'new-password'},
  reset: {title: '비밀번호 재설정', action: '재설정 메일 보내기'}
};

function authError(error) {
  switch (error.code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return '이메일 또는 비밀번호를 확인해 주세요.';
    case 'auth/email-already-in-use':
      return '이 이메일로 가입을 진행할 수 없어요. 로그인하거나 비밀번호를 재설정해 주세요.';
    case 'auth/weak-password':
    case 'auth/password-does-not-meet-requirements':
      return '비밀번호가 요구 조건을 충족하지 않아요. 더 길고 다양한 문자로 다시 입력해 주세요.';
    case 'auth/too-many-requests':
      return '요청이 많아요. 잠시 뒤 다시 시도해 주세요.';
    case 'auth/network-request-failed':
      return '인터넷 연결을 확인한 뒤 다시 시도해 주세요.';
    default:
      return '계정 요청을 처리하지 못했어요. 잠시 뒤 다시 시도해 주세요.';
  }
}

export function initAccount() {
  if (!firebaseConfig?.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) return;

  const open = document.getElementById('account-open');
  const dialog = document.getElementById('account-dialog');
  const title = document.getElementById('account-title');
  const form = document.getElementById('account-form');
  const modeLinks = document.getElementById('account-modes');
  const session = document.getElementById('account-session');
  const status = document.getElementById('account-status');
  const verification = document.getElementById('account-verification');
  const email = form.elements.namedItem('email');
  const password = form.elements.namedItem('password');
  const submit = document.getElementById('account-submit');
  const actionSettings = {url: new URL('./#account', import.meta.url).href};
  let sdk;
  let auth;
  let pending = false;
  let mode = 'login';

  function setMode(next) {
    mode = next;
    const settings = accountModes[mode];
    title.textContent = settings.title;
    submit.textContent = settings.action;
    password.value = '';
    password.closest('label').hidden = mode === 'reset';
    password.disabled = mode === 'reset';
    password.required = mode !== 'reset';
    password.autocomplete = settings.autocomplete || 'off';
    password.minLength = mode === 'signup' ? 8 : 1;
    modeLinks.querySelectorAll('button').forEach(button => {
      button.hidden = button.dataset.mode === mode;
    });
  }

  function renderUser(user) {
    open.textContent = user ? '내 계정' : '로그인';
    form.hidden = Boolean(user);
    modeLinks.hidden = Boolean(user);
    session.hidden = !user;
    verification.hidden = !user || user.emailVerified;
    if (user) {
      title.textContent = user.emailVerified ? '내 계정' : '이메일 인증을 완료해 주세요';
      document.getElementById('account-email').textContent = user.email || '';
    } else {
      setMode(mode);
    }
  }

  async function run(action, failure = authError) {
    if (pending) return;
    pending = true;
    dialog.setAttribute('aria-busy', 'true');
    status.textContent = '';
    const actions = dialog.querySelectorAll('[data-account-action]');
    actions.forEach(button => { button.disabled = true; });
    try {
      await action();
    } catch (error) {
      status.textContent = failure(error);
    } finally {
      pending = false;
      dialog.removeAttribute('aria-busy');
      actions.forEach(button => { button.disabled = false; });
    }
  }

  async function openAccount() {
    if (!dialog.open) dialog.showModal();
    if (auth) return;
    await run(async () => {
      status.textContent = '계정 서비스를 연결하고 있어요…';
      const [appSdk, authSdk] = await Promise.all([
        import(sdkBase + 'firebase-app.js'),
        import(sdkBase + 'firebase-auth.js')
      ]);
      const app = appSdk.getApps().find(instance => instance.name === 'harudodum') ||
        appSdk.initializeApp(firebaseConfig, 'harudodum');
      const client = authSdk.getAuth(app);
      client.languageCode = 'ko';
      await client.authStateReady();
      sdk = authSdk;
      auth = client;
      sdk.onAuthStateChanged(auth, renderUser);
      renderUser(auth.currentUser);
      status.textContent = '';
    }, () => '계정 서비스에 연결하지 못했어요. 인터넷을 확인하고 창을 닫았다 다시 열어 주세요.');
  }

  open.hidden = false;
  open.addEventListener('click', openAccount);
  dialog.addEventListener('close', () => { password.value = ''; });
  if (window.location.hash === '#account') openAccount();

  modeLinks.addEventListener('click', event => {
    const button = event.target.closest('button[data-mode]');
    if (!button || pending) return;
    setMode(button.dataset.mode);
    status.textContent = '';
    email.focus();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!auth || pending) return;
    const address = email.value.trim();
    const secret = password.value;
    password.value = '';
    run(async () => {
      if (mode === 'signup') {
        const {user} = await sdk.createUserWithEmailAndPassword(auth, address, secret);
        try {
          await sdk.sendEmailVerification(user, actionSettings);
          status.textContent = '인증 메일을 보냈어요. 메일의 링크를 누른 뒤 인증을 확인해 주세요.';
        } catch {
          status.textContent = '계정은 만들어졌어요. 인증 메일이 도착하지 않으면 다시 보내 주세요.';
        }
      } else if (mode === 'reset') {
        try {
          await sdk.sendPasswordResetEmail(auth, address, actionSettings);
        } catch (error) {
          if (error.code !== 'auth/user-not-found') throw error;
        }
        status.textContent = '가입한 이메일이라면 비밀번호 재설정 안내가 도착해요.';
      } else {
        const {user} = await sdk.signInWithEmailAndPassword(auth, address, secret);
        status.textContent = user.emailVerified ? '이 기기에서 로그인했어요.' : '메일의 인증 링크를 먼저 확인해 주세요.';
      }
    });
  });

  document.getElementById('account-resend').addEventListener('click', () => run(async () => {
    const user = auth.currentUser;
    if (!user) return;
    await sdk.sendEmailVerification(user, actionSettings);
    status.textContent = '인증 메일을 다시 보냈어요.';
  }));

  document.getElementById('account-verified').addEventListener('click', () => run(async () => {
    const user = auth.currentUser;
    if (!user) return;
    await sdk.reload(user);
    renderUser(auth.currentUser);
    status.textContent = auth.currentUser?.emailVerified
      ? '이메일 인증을 확인했어요.'
      : '아직 인증되지 않았어요. 이메일에서 인증 링크를 눌러 주세요.';
  }));

  document.getElementById('account-signout').addEventListener('click', () => run(async () => {
    await sdk.signOut(auth);
    setMode('login');
    status.textContent = '이 기기에서 로그아웃했어요.';
  }));
}
