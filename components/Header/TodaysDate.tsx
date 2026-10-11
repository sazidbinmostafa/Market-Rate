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
        <p className='text-xs cursor-default inter'>{formattedDate}</p>
    )
}

export default TodaysDate