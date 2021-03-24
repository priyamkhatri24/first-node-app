document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const search = e.target.querySelector('input').value
    e.target.querySelector('input').value = ''
    fetch(`http://localhost:3000/weather?address=${search}`).then(res => res.json()).then(res => {
        document.querySelector('.forecast').innerHTML = ''
        const markup = res.location ? `<p><strong>${res?.location}</strong></p><br><p>${res?.weather_descriptions}. Temperature is ${res?.temperature} ℃.</p>` : `<p>${res.error}</p>`
        document.querySelector('.forecast').insertAdjacentHTML('afterbegin',markup)
    })
})

