window.addEventListener("DOMContentLoaded", main);

async function main() {
  const container = document.querySelector(".container");

  const wrapper = document.createElement("div");
  const mainHeading = document.createElement("h1");
  const heading = document.createElement("h2");
  const blogList = document.createElement("ul");
  const pagesList = document.createElement('ul');

  wrapper.classList.add("wrapper");
  mainHeading.classList.add("main-heading");
  heading.classList.add("heading");
  blogList.classList.add("blog-list");
  pagesList.classList.add('pages-list');
  mainHeading.innerHTML = "Main heading";
  heading.innerHTML = "The most useful Heading";

  container.prepend(mainHeading);
  container.append(wrapper);
  wrapper.append(blogList);
  wrapper.prepend(heading);
  wrapper.append(pagesList);
  const params = new URLSearchParams(window.location.search); // page = 5
  const pageNum = params.get("page") ?? 1; // 5
  const blogs = await fetch(
    `https://gorest.co.in/public-api/posts?page=${pageNum ?? 1}`
  ); // 5

  const createPaginatedPages = (currentPage, offset, lastPage) => {
    const pages = [];
    currentPage = Number(currentPage);
    const currentPagePlusOffset =
      currentPage + offset < lastPage ? currentPage + offset : lastPage;

    for (let i = 1; i <= currentPagePlusOffset; i++) {
      if (i === 1) {
        pages.push(i);
        i = currentPage;
        continue;
      }
      pages.push(i);
    }

    return pages;
  };
  const bodyBlogs = await blogs.json();
  
  createPaginatedPages(pageNum, 5, bodyBlogs.meta.pagination.pages)
    .map((num) => `?page=${num}`)
    .forEach((href) => {
      const aElement = document.createElement("a");
      aElement.setAttribute("href", href);
      aElement.classList.add('pages-list__link');
      aElement.textContent = href.replace(/[^0-9, ]/g,"");
      const li = document.createElement('li');
      li.classList.add('pages-list__item');
      li.append(aElement);
      pagesList.append(li)
    
    });

  
    


    const createBlogs = (blogs) => {
      const arrOfBlogs = blogs.data;
  
      for (blog of arrOfBlogs) {
        createBlogItem(blog)
      }
    }
    
    createBlogs(bodyBlogs)
    
    async function createBlogItem(blogItem) {
  
      const blogWrapper = document.createElement("li");
      const blogText = document.createElement("p");
      const blogTitle = document.createElement("h3");
      const blogButton = document.createElement("a");
      
    
      blogWrapper.classList.add("blog-item");
      blogButton.classList.add("blog-button");
      blogButton.setAttribute('id', blogItem.id)
    
      blogList.append(blogWrapper);
      blogWrapper.prepend(blogTitle);
      blogWrapper.append(blogText);
      blogWrapper.append(blogButton);
    
      blogButton.innerText = "Read more";
      blogButton.setAttribute('href', "blog.html?id="+ blogItem.id)
      blogTitle.innerText = blogItem.title;
      blogText.innerText = blogItem.body;
    }


    const allButtons = document.querySelectorAll('.blog-button');
   
    allButtons.forEach(button => {
      button.addEventListener('click', () =>{
        console.log(button.id);
        // localStorage.setItem('key', button.id);
        // localStorage.setItem('currentUrl', document.location.href);
      })
    });

}


