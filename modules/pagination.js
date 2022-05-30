export function createPageBlock(totalPages, page, resizePageBlock, block, curPage) {
  let elemPage = ''
  let activePage

  let beforePages = page - 1
  let afterPages = page + 1
  let impossibleBtn

  if(page === 1) {
    impossibleBtn = 'impossible'
  } else {
    impossibleBtn = ''
  }

  elemPage += `<h4 class="start-page circle ${impossibleBtn}" >&lt;&lt;</h4>`
  if(page > 1) {
    elemPage += `<h4 class="previous-page circle ${impossibleBtn}">&lt;</h4>`
  } else {
    elemPage += `<h4 class="previous-page circle ${impossibleBtn}">&lt;</h4>`
  }


  if(page == totalPages && beforePages > 0) {
    beforePages = beforePages - 1
  }

  if(page == 1) {
    afterPages = afterPages + 1
  }

  if(resizePageBlock === false) {
    for(let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
      if (pageLength > totalPages) {
        continue
      }
      if(pageLength == 0) {
        pageLength = pageLength + 1
      }
      if(page == pageLength) {
        activePage = 'active-page'
      } else {
        activePage = ''
      }
      elemPage +=  `<h4 class="current-page circle ${activePage}">${pageLength}</h4>`
    }
  } else {
    elemPage +=  `<h4 class="current-page circle active-page">${page}</h4>`
  }

  if(page === totalPages) {
    impossibleBtn = 'impossible'
  } else {
    impossibleBtn = ''
  }

  if(page < totalPages) {
    elemPage += `<h4 class="next-page circle ${impossibleBtn}">&gt;</h4>`
  } else {
    elemPage += `<h4 class="next-page circle ${impossibleBtn}">&gt;</h4>`
  }
  elemPage += `<h4 class="end-page circle ${impossibleBtn}">&gt;&gt;</h4>`

  block.innerHTML = elemPage
  curPage = page
}