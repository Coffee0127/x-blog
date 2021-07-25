function enableLocalSearch(path, inputElementId, resultElementId) {
  'use strict';
  $.ajax({
    url: path,
    dataType: 'xml',
    success: function (xmlResponse) {
      // get the contents from search data
      const articles = $('entry', xmlResponse).map(function () {
        return {
          title: $('title', this).text().trim(),
          content: $($('content', this).text())
            // remove line number block
            .find('.gutter').remove().end()
            .text()
            .trim(),
          url: $('url', this).text().trim()
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
          const articleTitle = article.title;
          const articleContent = article.content;
          const articleUrl = article.url;

          const articleTitleInLowerCase = articleTitle.toLowerCase();
          const articleContentInLowerCase = articleContent.toLowerCase();
          let indexTitle = -1;
          let indexContent = -1;
          let indexFirstOccur = -1;
          // only match articles with not empty titles and contents
          if (articleTitleInLowerCase !== '' && articleContentInLowerCase !== '') {
            keywords.forEach(function (keyword, i) {
              indexTitle = articleTitleInLowerCase.indexOf(keyword);
              indexContent = articleContentInLowerCase.indexOf(keyword);
              if (indexTitle < 0 && indexContent < 0) {
                isMatch = false;
              } else {
                if (indexContent < 0) {
                  indexContent = 0;
                }
                if (i === 0) {
                  indexFirstOccur = indexContent;
                }
              }
            });
          }
          // show search results
          if (isMatch) {
            searchResultHtml += `<li><a href="${articleUrl}" class="search-result-title">${articleTitle}</a>`;
            if (indexFirstOccur >= 0) {
              // cut out 100 characters
              const partialArticleLength = 100;
              let from = indexFirstOccur - 20;
              if (from < 0) {
                from = 0;
              }
              let matchContent = articleContent.substr(from, partialArticleLength);
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
