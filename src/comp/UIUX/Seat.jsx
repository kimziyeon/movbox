//예매페이지(좌석선택)

"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import "../style/seat.scss";

function Seat({ moveNext, isAllSelect, userPoster }) {

    // console.log(isAllSelect, 'isAllSelect(유저선택 영화정보)')
    // console.log(userPoster, 'posterId(유저선택 영화포스터)')
    const [select, setSelect] = useState([])

    const [seatList, setSeatList,] = useState({
        A: [false, true, true, true, true, false],
        B: [true, true, true, true, true, true],
        C: [true, true, true, true, true, true],
        D: [true, true, true, true, true, true],
        E: [true, true, true, true, true, true],
        F: [false, false, true, true, true, true],
    })

    const seatClickHandle = (row, seat, k) => {
        // console.log(row, seat, k, 'seatClickHandle')

        //seat가 false일떄 return
        if (!seat) {
            return;
        }

        let seatState = `${row}${k}`

        //seat가 true일때
        //if(seatState 좌석이 선택된 상태(true)면 좌석 선택해제}
        //else{seatState 좌석이 선택X(false)면 좌석 선택[...select이미 좌석에 추가선택]}
        if (select.includes(seatState)) {
            setSelect(select.filter(select => select !== seatState))
        } else {
            setSelect([...select, seatState])
        }
    }



    return (
        <>
            <article className='seat'>
                <div className='seat_cont'>

                    <div className="poster">
                        <Image src={userPoster}
                            width={1000} height={1500}
                            alt="영화포스터"
                            priority />
                        <div className="overlay"></div>
                    </div>

                    <div className="poster_pc">
                        <Image src={userPoster}
                            width={1000} height={1500}
                            priority
                            alt="영화포스터"
                        />
                    </div>

                    <div className='seat_box_back'></div>

                    <div className='seat_box'>
                        <div className='user_selected'>
                            <div className='user_mv'>{isAllSelect.title}</div>
                            <div className='user_date'>{isAllSelect.date}</div>
                            <div className='user_time'>{isAllSelect.time}</div>
                        </div>

                        <div className='inner'>
                            <div className='screen'>
                                <div>SCREEN</div>
                            </div>
                            <div className='seat_list'>
                                {
                                    Object.keys(seatList).map((row) => (
                                        <div key={row} className='row'>
                                            <div className='list_num'>{row}</div>
                                            {
                                                seatList[row].map((seat, k) => (
                                                    <div key={`${seat}${k}`}
                                                        className={`list ${seat ? `true` : `false`} ${select.includes(`${row}${k + 1}`) ? 'select' : ''}`}
                                                        onClick={() => { seatClickHandle(row, seat, k + 1) }}
                                                    >
                                                    </div>
                                                ))
                                            }
                                            <div className='list_num'>{row}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='seat_info'>
                                <p>
                                    <span className='yes'></span>
                                    선택가능
                                </p>
                                <p>
                                    <span className='no'></span>
                                    선택불가
                                </p>
                            </div>
                            <Link href={{
                                pathname: '/Complete',
                                query: {
                                    isAllSelect: JSON.stringify(isAllSelect),
                                    seatSelect: JSON.stringify(select)
                                }
                            }}>
                                <div className="btn mob on">예매 완료</div>
                            </Link>
                        </div>
                    </div>

                </div>
            </article>
        </>
    )
}

export default Seat;