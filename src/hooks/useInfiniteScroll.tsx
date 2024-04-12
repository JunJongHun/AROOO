import { useEffect, useRef } from 'react';

// useInfiniteScroll 커스텀 훅
function useInfiniteScroll(callback = () => {}, options = {}) {
  // 옵저버를 위한 ref 생성
  const observerRef = useRef(null);

  // observer callback

  // Intersection Observer 초기화 및 설정
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      // 옵저버가 관찰하는 요소가 화면에 보이는지 확인
      if (entries[0].isIntersecting) {
        callback(); // 데이터 불러오기 함수 실행
      }
    }, options);

    observer.observe(observerRef.current); // 옵저버가 ref의 current 요소를 관찰하도록 설정
    return () => observer.disconnect(); // 컴포넌트 제거 시 옵저버 해제
  }, [callback, options]);

  return observerRef; // 옵저버가 관찰할 요소의 ref 반환
}

export default useInfiniteScroll;
