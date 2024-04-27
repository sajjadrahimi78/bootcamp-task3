// http://localhost:3000/transactions

const btn = document.querySelector('.btn-primary')
const main = document.querySelector('.main')
const tbody = document.querySelector('.tbody')
const priceIcon = document.querySelector('.price-icon')
const dateIcon = document.querySelector('.date-icon')
const priceSvg = document.querySelector('.pSvg')
const dateSvg = document.querySelector('.dSvg')
const searchInput = document.querySelector('#search')


const URL = 'http://localhost:3000/transactions'
let allData = []

btn.addEventListener('click', () => {
  axios
    .get(URL)
    .then(res => {
      allData = res.data
      createTableRows()
      btn.classList.add('hidden')
      btn.classList.remove('h-screen')
      btn.parentElement.remove('h-screen')
      main.classList.remove('hidden')
      searchInput.parentElement.classList.remove('hidden')
    })
    .catch(err => console.log(err.message))
})

searchInput.addEventListener("input", (e) => {
  // console.log(URL + `?id_like=${e.target.value}`);
  // console.log(URL + `?refId_like=${e.target.value}`);
  axios
      .get(URL +  `?refId_like=${e.target.value}`)
      .then(res => {
        allData = res.data
        createTableRows()
      })
      .catch(err => console.log(err.message))
})

priceIcon.addEventListener('click', () => {
  console.log(priceSvg.classList.toggle('x'))
  if (priceSvg.classList.toggle('x')) {
    axios
      .get(URL + '?_sort=price&_order=desc')
      .then(res => {
        allData = res.data
        createTableRows()
      })
      .catch(err => console.log(err.message))
  }
  if (priceSvg.classList.toggle('x')) {
    axios
      .get(URL + '?_sort=price&_order=asc')
      .then(res => {
        allData = res.data
        createTableRows()
      })
      .catch(err => console.log(err.message))
  }
})

dateIcon.addEventListener('click', e => {
  console.log(dateSvg.classList.toggle('x'))
  if (dateSvg.classList.toggle('x')) {
    axios
      .get(URL + '?_sort=date&_order=desc')
      .then(res => {
        allData = res.data
        createTableRows()
      })
      .catch(err => console.log(err.message))
  }
  if (dateSvg.classList.toggle('x')) {
    axios
      .get(URL + '?_sort=date&_order=asc')
      .then(res => {
        allData = res.data
        createTableRows()
      })
      .catch(err => console.log(err.message))
  }
})



function createTableRows () {
  let result = ''
  allData.forEach(data => {
    result += `
        <tr>
          <td>${data.id}</td>
          ${
            data.type === 'افزایش اعتبار'
              ? `<td style="color : green">${data.type}</td>`
              : `<td style="color : red">${data.type}</td>`
          } 
          <td>${data.price}</td>
          <td>${data.refId}</td>
          <td>${new Date(data.date).toLocaleString('fa', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit'
          })}</td>
        </tr>

        `
    tbody.innerHTML = result
  })
}
