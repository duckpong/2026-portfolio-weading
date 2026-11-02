// 웨딩 사진을 누르면 화면 위에 크게 표시합니다.
const photoModal = document.querySelector('#photoModal');
const modalImage = document.querySelector('#modalImage');
const closePhoto = document.querySelector('.modal-close');

document.querySelectorAll('[data-photo]').forEach((button) => {
  button.addEventListener('click', () => {
    modalImage.src = button.dataset.photo;
    photoModal.classList.add('is-open');
    photoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});
function hidePhotoModal() {
  photoModal.classList.remove('is-open');
  photoModal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
  document.body.style.overflow = '';
}
closePhoto.addEventListener('click', hidePhotoModal);
photoModal.addEventListener('click', (event) => {
  if (event.target === photoModal) hidePhotoModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    hidePhotoModal();
    hideCopyModal();
  }
});

// 계좌번호 복사 후 별도의 안내 팝업을 보여줍니다.
const copyModal = document.querySelector('#copyModal');
const copyTitle = document.querySelector('#copyTitle');
const copyMessage = document.querySelector('#copyMessage');
const closeCopy = document.querySelector('#closeCopy');

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    const label = button.dataset.label || '정보';
    try {
      // HTTPS 또는 localhost 환경에서는 Clipboard API를 사용합니다.
      await navigator.clipboard.writeText(value);
      copyTitle.textContent = '복사 완료';
      copyMessage.textContent = `${label}가 클립보드에 복사되었습니다.`;
    } catch (error) {
      // 로컬 파일 등에서 권한이 제한되면 복사할 내용을 팝업에 표시합니다.
      copyTitle.textContent = '계좌번호 확인';
      copyMessage.textContent = `${label}: ${value}`;
    }
    copyModal.classList.add('is-open');
    copyModal.setAttribute('aria-hidden', 'false');
  });
});
function hideCopyModal() {
  copyModal.classList.remove('is-open');
  copyModal.setAttribute('aria-hidden', 'true');
}
closeCopy.addEventListener('click', hideCopyModal);
copyModal.addEventListener('click', (event) => {
  if (event.target === copyModal) hideCopyModal();
});

// 갤러리의 사진 모음으로 이동합니다.
document.querySelector('#morePhotos').addEventListener('click', () => {
  document.querySelector('#gallery-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  document.querySelector('.gallery-grid').scrollIntoView({ behavior: 'smooth', block: 'center' });
});
