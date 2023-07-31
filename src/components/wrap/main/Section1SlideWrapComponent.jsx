import React from 'react';

export default function Section1SlideWrapComponent({이미지소스}) {

    const slideWrap         = React.useRef();
    const [cnt, setCnt] = React.useState(0);
    const [n, setN] = React.useState(0);
    const [isArrow, setIsArrow] = React.useState(false);
    
    const [timerOnOff, setTimerOnOff] = React.useState(false);
    const [slide, setSlide] = React.useState(true);
    const [duration, setDuration] = React.useState(4000);

    const [click, setClick] =  React.useState(false);


    // 슬라이드 전체 개수의 너비 설정 : 디버그
    React.useEffect(()=>{
        slideWrap.current.style.width = `${100*이미지소스.length}%`; // 23*100 = 2300%
        slideWrap.current.style.marginLeft = `${-100*1}%`; // 23*100 = 2300%
        setN(이미지소스.length-2);
    },[이미지소스]);

      
    // 메인 슬라이드    
    React.useEffect(()=>{
        if( cnt>=0  && cnt<=n ){
                if( cnt===0 ){
                    if(click===true){
                        slideWrap.current.style.transition = `all 0.6s ease-in-out`; 
                    }
                    else{
                        slideWrap.current.style.transition = 'none';
                    }
                }
                else{
                    slideWrap.current.style.transition = `all 0.6s ease-in-out`;       
                }            
                slideWrap.current.style.left = `${-100*cnt}%`;
        }
        else{
                if(cnt>n){ // 마지막이면 처음으로 리턴  > n
                    setCnt(1);
                    slideWrap.current.style.transition = 'none';
                    slideWrap.current.style.left = `0%`;
                } 
                if(cnt<0){  // 처음이면 마지막으로 리턴 
                    setCnt(n-1);         
                    slideWrap.current.style.transition = 'none';
                    slideWrap.current.style.left = `${-100*n}%`;
                } 
        }
    },[slide && cnt]);

    // 자동 타이머
    React.useEffect(()=>{

        if(timerOnOff===true){
            setTimeout(()=>{ 
                setCnt(cnt+1);
                setClick(false);
            }, duration);
        }
        else{
            setTimeout(()=>{ // 현재슬라이드에서 멈춰라
                setCnt(cnt);
                setClick(true);
            }, duration);
        }    
          

    },[timerOnOff && cnt]);

    const onClickNext=(e)=>{
        e.preventDefault();
        setCnt(cnt+1);  
        setSlide(true); 
        setTimerOnOff(false); // 타이머는 강제 종료
        setClick(true);
    }

    const onClickPrev=(e)=>{
        e.preventDefault();
        setCnt(cnt-1);
        setSlide(true); 
        setTimerOnOff(false); // 타이머는 강제 종료
        setClick(true);
    }

    // 컨테이너에 마우스 오버시 슬라이드 타이머 중지
    const onMouseEnterStop=()=>{
        setIsArrow(true);
        setTimerOnOff(false);
        setSlide(false);
    }

    // 컨테이너에 마우스 떠나면 슬라이드 타이머 재시작
    const onMouseLeavePlay=()=>{
        setIsArrow(false);
        // setTimerOnOff(true);
        // setSlide(true); 
    }




    return (
            <div className="slide-container"    onMouseEnter={onMouseEnterStop}   onMouseLeave={onMouseLeavePlay} >
                <div className="slide-view">

                    <ul ref={slideWrap} className="slide-wrap">
                    {  
                        이미지소스.map((item,idx)=>{
                                return(
                                    <li key={idx} className="slide slide21"><a href="!#"><img src={item.src} alt="" /></a></li>
                                )
                        })
                    } 
                    </ul>

                </div>

                <a onClick={onClickNext} href="!#" className={`next-btn${isArrow===true?' on':''}`}><img src="./images/intro/icon_arrow_bg_gray.svg" alt="" /></a>
                <a onClick={onClickPrev} href="!#" className={`prev-btn${isArrow===true?' on':''}`}><img src="./images/intro/icon_arrow_bg_gray.svg" alt="" /></a>

                <span className='page-count'>
                    <em className='current'>{cnt+1>n?1:cnt+1}</em><i>/</i><em className='total'>{n}</em>
                </span>
            </div>
    );
};

 