import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AppBar from '../../component/appbar/AppBar';

const PRIVACY_MARKDOWN = `
Malang 개인 정보 처리 방침

마지막 업데이트: 2026. 06. 21.

이 개인 정보 처리 방침은 hyuni.dev가 제공하는 Malang 앱에서 정보를 처리하는 방법을 설명합니다.

## 처리하는 정보

Malang은 계정, 로그인, 이름, 이메일 주소, 전화번호, 위치, 연락처, 결제 정보를 요구하지 않습니다.

사용자가 카메라 또는 사진 보관함에서 이미지를 선택하면, Malang은 해당 이미지를 앱 안에서 처리하여 말랑이를 생성합니다. 생성된 말랑이 이미지와 작은 라이브러리 정보는 사용자의 기기 내 앱 전용 저장공간에 저장됩니다. Malang 앱은 사용자가 선택한 사진이나 생성된 이미지를 hyuni.dev 서버로 업로드하지 않습니다.

Malang은 앱의 움직임 효과를 위해 기기의 모션 센서 데이터를 사용할 수 있습니다. 이 센서 데이터는 기기 안에서 실시간으로 사용되며 Malang이 저장하지 않습니다.

## 광고

Malang은 광고 표시를 위해 Google AdMob을 사용합니다. Google Mobile Ads SDK는 광고 제공, 분석, 부정 사용 방지 및 보안 목적을 위해 기기 식별자, IP 주소, 앱 상호작용, 진단 정보, 광고 관련 정보 등을 수집하거나 공유할 수 있습니다.

Google이 파트너 앱과 사이트에서 정보를 사용하는 방식은 다음 문서를 참고하십시오.

- https://policies.google.com/technologies/partner-sites
- https://policies.google.com/privacy

## 권한

Malang은 다음 권한을 요청할 수 있습니다.

- 카메라: 사진을 촬영하여 말랑이를 만들기 위해 사용합니다.
- 사진 또는 미디어 보관함: 기존 이미지를 선택하여 말랑이를 만들기 위해 사용합니다.
- 인터넷: 광고를 불러오고 표시하기 위해 사용합니다.

## 정보 공유

Malang은 사용자의 개인 정보를 판매하지 않습니다.

Malang은 사용자가 선택한 사진을 hyuni.dev 서버로 공유하지 않습니다. 다만 광고 관련 데이터는 위에서 설명한 것처럼 Google AdMob에 의해 수집되거나 공유될 수 있습니다.

## 보관 및 삭제

Malang에서 생성한 이미지는 사용자가 앱 안에서 삭제하거나 앱을 제거할 때까지 기기 안에 저장됩니다.

개인정보 관련 문의 또는 삭제 요청이 있으면 spaceship00@naver.com으로 연락해 주십시오.

## 아동

Malang은 만 13세 미만 아동을 대상으로 하지 않습니다. 아동의 개인정보가 앱을 통해 제공되었다고 생각하는 경우, 아래 연락처로 문의해 주십시오.

## 변경

이 개인 정보 처리 방침은 변경될 수 있습니다. 변경되는 경우 이 페이지의 마지막 업데이트 날짜를 수정합니다.

## 문의

hyuni.dev

spaceship00@naver.com
`;

export default function MalangPrivacyPage() {
  return (
    <>
      <AppBar title="Malang 개인 정보 처리 방침"></AppBar>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {PRIVACY_MARKDOWN}
      </ReactMarkdown>
      <div style={{ textAlign: 'end' }}>
        hyuni.dev&nbsp;
        <br />
        2026. 06. 21.
      </div>
    </>
  );
}
