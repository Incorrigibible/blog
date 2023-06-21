window.addEventListener("DOMContentLoaded", main);

async function main() {
    // blogId = localStorage.getItem('key');
    // console.log(blogId)
    const getBlogPage = (blog) => {
        const searchParams = new URLSearchParams(blog);
        return searchParams.get('id');
    }

    
    const getBlog = await fetch(`https://gorest.co.in/public-api/posts/${getBlogPage(window.location.search)}`);
    const getComments = await fetch(`https://gorest.co.in/public-api/comments?post_id=${getBlogPage(window.location.search)}`);
    const blogJson = await getBlog.json();
    console.log(getBlogPage(window.location.search))
    const commentsJson = await getComments.json();
    
  
    console.log(commentsJson);

    if (!commentsJson.data[0]) {
        console.log(123)
    }


    const container = document.querySelector('.container');
    const wrapper = document.createElement('div');
    const blog = document.createElement('div');
    blog.classList.add('blog');
    wrapper.classList.add('wrapper');
    wrapper.classList.add('block');
    const blogText = document.createElement('p');
    blogText.innerText = blogJson.data.body;
    blogText.classList.add('blog-text')
    const mainHeading = document.createElement("h1");
    mainHeading.classList.add('main-heading')
    mainHeading.innerText = 'Main heading';
    const backButton = document.createElement('a');
    backButton.innerText = 'Back';
    backButton.classList.add('blog__back-btn');
    const prevUrl = document.referrer;
    backButton.setAttribute('href', prevUrl);
    
    const heading = document.createElement("h2");
    heading.classList.add('heading');
    heading.innerText = blogJson.data.title;
    const commentsHeading = document.createElement('h2');
    commentsHeading.classList.add('comments__heading');
    commentsHeading.innerText = 'Comments';
    blog.append(blogText);
    blog.append(commentsHeading);
    


    container.append(wrapper);
    wrapper.append(mainHeading);
    wrapper.append(heading);
    wrapper.append(blog);
    wrapper.append(backButton);

    // create comments
    const commentsList = document.createElement('ul');
    commentsList.classList.add('comments__list');
    blog.append(commentsList);

    const createComment = (comment) => {
        
        const commentItem = document.createElement('li');
        const commentEmail = document.createElement('a');
        const commentText = document.createElement('p');
        const commentName = document.createElement('p');
        const commentAside = document.createElement('div');
        const commentImg = document.createElement('img');

        commentItem.classList.add('comments__item');
        commentEmail.classList.add('comments__email');
        commentText.classList.add('comments__text');
        commentName.classList.add('comments__name');
        commentAside.classList.add('comments__aside');
        commentImg.classList.add('comments__img');

        
        commentEmail.innerText = comment.email;
        commentText.innerText = comment.body;
        commentName.innerText = comment.name;
        
        commentImg.setAttribute('src', `https://i.pravatar.cc/150?u=${comment.email}`);
        commentEmail.setAttribute('href', `mailto: ${comment.email}`)
        

        
        commentsList.append(commentItem);
        commentItem.append(commentAside);
        commentAside.append(commentImg);
        commentAside.append(commentName);
        commentAside.append(commentEmail);
        commentItem.append(commentText);
    }

    for (elem of commentsJson.data) {
        createComment(elem);
    }

}