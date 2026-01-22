# DadaChat Widget

외부 웹사이트에 `<script>` 한 줄로 삽입 가능한  
**React 기반 고객 문의(Chat) 위젯**입니다.

DadaChat 서비스의 진입점 역할을 하며,  
웹사이트 방문자가 관리자에게 문의를 남길 수 있는 UI를 제공합니다.

---

## System Overview

DadaChat은 아래 3개의 독립적인 애플리케이션으로 구성되어 있습니다.

- **Widget**: 외부 웹사이트에 삽입되는 고객 문의 UI
- **Dashboard**: 관리자가 문의를 확인하고 응답하는 관리자 화면
- **Backend API**: 인증, 데이터 저장, 실시간 통신을 담당하는 서버

이 레포지토리는 그 중 **Widget** 영역을 담당합니다.

---

## Tech Stack

- React
- Vite
- TypeScript
- Socket.io Client
- Zustand (visitor, chattingroom, messages state)

---

## Why React + Vite Widget?

단순 JavaScript 스크립트가 아닌  
**React 기반 위젯**으로 구현한 이유는 다음과 같습니다.

- 위젯의 다양한 UI 상태  
  (열림/닫힘, 채팅 상태, 로딩, 입력 단계 등)을 명확하게 관리
- Vite를 활용해 빠른 개발 환경 구성 및 번들링 최적화
- 관리자 대시보드와 기술 스택 일부 공유 가능
  (관리자 대시보드(Next.js)와 동일한 React + TypeScript 기반으로,
  컴포넌트 설계와 상태 관리 방식의 일관성을 유지할 수 있음)
- 추후 기능 확장에도 유리

---

## Usage

웹사이트의 `<body>` 하단에 아래 스크립트를 삽입하면  
위젯이 자동으로 로드됩니다.
(대시보드에서 등록한 도메인에서 스크립트를 복사할 수 있습니다.)

```html
<script
  src="WIDGET_BASE_URL/widget.js"
  data-dadachat-site-key="SITE_KEY"
></script>
```
