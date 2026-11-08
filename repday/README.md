# 리프데이 · 3일 맨몸 운동

갤럭시, 아이폰, PC에서 같은 주소로 사용할 수 있는 설치형 웹앱(PWA)입니다.

## VS Code에서 실행하기

1. ZIP을 풀고 VS Code에서 **파일 → 폴더 열기**로 `repday` 폴더를 엽니다.
2. **터미널 → 새 터미널**을 열고 아래 명령을 실행합니다. Python 3가 설치되어 있어야 합니다.

   ```powershell
   python -m http.server 8000 --bind 127.0.0.1
   ```

3. PC 브라우저에서 [http://localhost:8000/](http://localhost:8000/)을 엽니다. 종료할 때는 터미널에서 Ctrl+C를 누릅니다.

`routine.mjs`에 운동 목록과 난이도·갱신 규칙이 있고, `app.mjs`에 화면 동작·기록·타이머가 있습니다. `index.html`과 `style.css`로 화면을 수정할 수 있습니다. 배포 파일을 바꿀 때는 `sw.js`의 캐시 버전도 올려 주세요.

## 휴대폰과 PC에서 같은 주소 열기

1. GitHub에 공개 저장소를 만들고 `repday` **폴더 안의 파일들**을 저장소 최상위에 업로드합니다.
2. 저장소 **Settings → Pages → Deploy from a branch**에서 **main / (root)**를 선택하고 저장합니다.
3. Pages 화면에 발급된 HTTPS 주소를 세 기기에서 엽니다. [GitHub 공식 배포 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
4. 앱으로 설치하려면 아래 메뉴를 사용합니다.

| 기기 | 설치 |
| --- | --- |
| 갤럭시 | Chrome에서 열고 ⋮ 메뉴에서 **설치 및 바로가기 만들기 → 설치**를 선택합니다. [Chrome 안내](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid) |
| 아이폰 | Safari에서 **공유 → 홈 화면에 추가**를 선택합니다. **웹 앱으로 열기**가 표시되면 켠 뒤 **추가**를 누릅니다. [Apple 안내](https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios) |
| PC | Chrome에서 주소창의 설치 버튼 또는 메뉴의 **페이지를 앱으로 설치**를 선택합니다. [Chrome 안내](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DDesktop) |

## 원본 n8n과 달라진 점

- 처음 앱을 연 날부터 3일 주기로 계산합니다. 새 운동일과 새 루틴은 한국 시간 오전 8시에 시작합니다.
- 루틴은 앱에 내장한 운동 목록에서 조합합니다. 원본의 Gemini 생성 및 Discord 자동 전송은 이 버전의 범위에서 제외했습니다.
- 체크 기록과 강도 설정은 현재 브라우저에 저장됩니다. 같은 주소를 열어도 기기 간 기록은 동기화되지 않습니다.
- HTTPS 또는 PC의 localhost에서 한 번 온라인으로 열어 파일 저장이 끝나면 오프라인에서도 사용할 수 있습니다.
