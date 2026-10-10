"use client"

function TodaysDate() {
    const todaysDate = new Date();
    const formattedDate = todaysDate.toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: "long",
        day: 'numeric',
        weekday: 'long'
    })

    return (
        <p className='text-sm text-[#1D271F]'>{formattedDate}</p>
    )
}

export default TodaysDate