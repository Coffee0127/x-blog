function enableLocalSearch(path, inputElementId, resultElementId) {
  'use strict';
  $.ajax({
    url: path,
    dataType: 'xml',
    success: function (xmlResponse) {
      // get the contents from search data
      const articles = $('entry', xmlResponse).map(function () {
        return {
          title: $('title', this).text(),
          content: $('content', this).text(),
          url: $('url', this).text()
        };
      }).get();
      const inputElement = document.getElementById(inputElementId);
      const resultElement = document.getElementById(resultElementId);
      inputElement.addEventListener('input', function () {
        resultElement.innerHTML = '';
        let searchResultHtml = `<ul class="search-result-list">`;
        if (this.value.trim().length <= 0) {
          return;
        }
        // use whitespace or "-" to separate keyword
        const keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
        // perform local searching
        articles.forEach(function (article) {
          let isMatch = true;
          const articleTitle = article.title.trim().toLowerCase();
          const articleContent = article.content.trim().replace(/<[^>]+>/g, '').toLowerCase();
          const articleUrl = article.url;
          let indexTitle = -1;
          let indexContent = -1;
          let firstOccur = -1;
          // only match articles with not empty titles and contents
          if (articleTitle !== '' && articleContent !== '') {
            keywords.forEach(function (keyword, i) {
              indexTitle = articleTitle.indexOf(keyword);
              indexContent = articleContent.indexOf(keyword);
              if (indexTitle < 0 && indexContent < 0) {
                isMatch = false;
              } else {
                if (indexContent < 0) {
                  indexContent = 0;
                }
                if (i === 0) {
                  firstOccur = indexContent;
                }
              }
            });
          }
          // show search results
          if (isMatch) {
            searchResultHtml += `<li><a href="${articleUrl}" class="search-result-title">${articleTitle}</a>`;
            const content = article.content.trim().replace(/<[^>]+>/g, '');
            if (firstOccur >= 0) {
              // cut out 100 characters
              let start = firstOccur - 20;
              let end = firstOccur + 80;
              if (start < 0) {
                start = 0;
              }
              if (start === 0) {
                end = 100;
              }
              if (end > content.length) {
                end = content.length;
              }
              let matchContent = content.substr(start, end);
              // highlight all keywords
              keywords.forEach(function (keyword) {
                const regExp = new RegExp(keyword, 'gi');
                matchContent = matchContent.replace(regExp, `<em class="search-keyword">${keyword}</em>`);
              });

              searchResultHtml += `<p class="search-result">${matchContent}...</p>`;
            }
            searchResultHtml += '</li>';
          }
        });
        searchResultHtml += '</ul>';
        resultElement.innerHTML = searchResultHtml;
      });
    }
  });
};
