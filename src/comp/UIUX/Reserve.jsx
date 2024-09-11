//예매페이지(ticket)

"use client";
import React, { useState, useEffect } from 'react';
import { useStore } from '../store/movie_store';
import { useSearchParams } from "next/navigation";
import "../style/reserve.scss";
import Link from 'next/link';
import Image from 'next/image';
import { format, subDays } from 'date-fns'; //여기추가

function Reserve(props) {
    let { dataFetch, dailyBoxOffice, movieCode } = useStore(); // 박스오피스 영화 10개 가져오는 스토어
    const params = useSearchParams()
    const UsermovieCode = params.get('movieCd');

    console.log(UsermovieCode, 'mmmmmmmmmmmovieCode')
    // console.log(dailyBoxOffice, movieCode)

    const ticketMvList = dailyBoxOffice.map((mvTitle, id) => {
        return { mvTitle, mvCode: movieCode[id] };
    })
    // console.log(ticketMvList)

    const userMvSelect = (k, mvTitle) => {
        console.log(k, mvTitle)
    }
    let fnsDate = new Date(); //여기추가
    const today = format(fnsDate,'yyyy년MM월dd일')
    
    let yesterday = format(subDays(fnsDate, 1), "yyyyMMdd") //여기추가
    useEffect(() => {
        dataFetch(yesterday) //여기추가
    }, [])

    //날짜는 내가 받아왔구 영화이름이나 이런건 userMvSelect 함수에서 가져온 mvTitle이용해서 영화제목 가져오면 될듯합니다?

    return (
        <>
            <article className='reserve'>
                <div className='inner'>
                    <div className='user_selected'>
                        <div className='user_mv'>아바타: 물의 길</div>
                        <div className='user_date'>{today}</div>
                        <div className='user_time'>20 : 50 ~</div>
                    </div>

                    <div className='list_box'>
                        <div className='list_mv'>
                            {
                                ticketMvList.map((obj, k) => (
                                    <p key={k} onClick={() => { userMvSelect(k, obj.mvTitle) }}>
                                        {obj.mvTitle}
                                    </p>
                                ))
                            }

                        </div>
                        <div className='list_date'>
                            <p>08월 14일</p>
                            <p>08월 15일</p>
                        </div>
                        <div className='list_time'>
                            <p>13 : 50</p>
                            <p>15 : 50</p>
                            <p>18 : 30</p>
                            <p>20 : 50</p>
                            <p>21 : 50</p>
                        </div>
                    </div>

                    <div className='btn mob'>선택 완료</div>
                </div>
            </article>
        </>
    );
}

export default Reserve;