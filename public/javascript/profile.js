const commentareaArray = $('p')

async function getFollowingIds(username) {

    const followIdArray = []

    const response = await fetch(`/api/users/username/${username}`)

    if (response.ok) {
        const data = await response.json();

        for (let i = 0; i < data.followings.length; i++) {
            followIdArray.push(data.followings[i].id)
        }

        return followIdArray
    }
}

async function followingBtnHandler(btn) {
    const username = btn.textContent;
    console.log(username)

    const response = await fetch(`/api/users/username/${username}`);

    if (response.ok) {
        const data = await response.json();

        document.location.replace(`/profile/${data.id}`);
    } else {
        alert(response.statusText);
    }
}

// run an if statement to check to see if the last word in the URL path isn't profile
// if not equal to profile then add the follow button

const urlLastWord = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
const following_username = $('#profile-username').text();

if (urlLastWord !== 'profile') {
    const followBtn = $('<button>')
        .html("<i class='fas fa-user-plus'></i>")
        .addClass('btn btn-primary')
        .attr({
            type: 'button',
            id: 'follow-btn'
        })
        .on('click', async function () {
            const response = await fetch('/api/followings', {
                method: 'POST',
                body: JSON.stringify({
                    following_username
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('You started following ' + following_username + '!')
            } else {
                alert(response.statusText)
            }
        })

    $('#follow-user-div').append(followBtn);
}
else {

    // get username from the profile page
    const username = $('#profile-username').text()

    // get list of following ids associated with username 
    getFollowingIds(username)

        .then((followIdArray) => {
            // for every following id, make an unfollow button
            for (let i = 0; i < followIdArray.length; i++) {

                const unfollowBtn = $('<button>')
                    .addClass('btn btn-primary')
                    .html('<i class="fas fa-user-minus"></i>')
                    .attr({
                        type: 'button',
                        id: 'unfollow-btn'
                    })
                    // add on click method to find the closest div, pull the id of that div and get the number at the end of the div id
                    // pass that id to the delete route to delete that specific following id
                    .on('click', async function () {

                        const followIdDivArray = $(this).closest('div').attr('id').split('-');

                        const followId = followIdDivArray[followIdDivArray.length - 1];

                        const response = await fetch(`/api/followings/${followId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (response.ok) {
                            // reload upon deletion to render updated list of followers
                            window.location.reload();
                        } else {
                            alert(response.statusText)
                        }
                    })

                let unfollowBtnDivEl = $('#unfollow-btn-div-' + followIdArray[i])

                $(unfollowBtnDivEl).append(unfollowBtn);
            }
        })
}

let favoriteButton = document.getElementById("favorite-button");
let toggleButton = "OFF";

function toggle() {
    let favoriteList = document.getElementById("favorite-game-list");

    if (toggleButton == "OFF") {
        favoriteList.style.display = "none";
        toggleButton = "ON";
    } else if ((toggleButton = "ON")) {
        favoriteList.style.display = "";
        toggleButton = "OFF";
    }
}

favoriteButton.addEventListener("click", toggle);

let commentButton = document.getElementById("comment-button");
let toggleCommentButton = "OFF";

function commentToggle() {
    let commentList = document.getElementById("comment-list");
    if (toggleCommentButton == "OFF") {
        commentList.style.display = "none";

        toggleCommentButton = "ON";
    } else if ((toggleCommentButton = "ON")) {
        commentList.style.display = "";
        toggleCommentButton = "OFF";
    }
}

commentButton.addEventListener("click", commentToggle);


let followButton = document.getElementById("follow-button");
let toggleFollowList = "OFF";

function followToggle() {
    let followList = document.getElementById("following-list");
    if (toggleFollowList == "OFF") {
        followList.style.display = "none";

        toggleFollowList = "ON";
    } else if ((toggleFollowList = "ON")) {
        followList.style.display = "";
        toggleFollowList = "OFF";
    }
}

followButton.addEventListener("click", followToggle);

const editButton = document.getElementById("editComment");

//edit comment function peer coded with Mark
async function editComment(btn) {
    const btnId = btn.id

    const commentId = btnId.split('-')[1];

    const comment_text = document.getElementById
        ("comment-update-" + commentId).textContent;
    console.log(comment_text)

    const game_id = document.getElementsByClassName("li-" + commentId)[0].id
    console.log(game_id)

    const response = await fetch('api/comments/' + commentId, {
        method: 'PUT',
        body: JSON.stringify({
            game_id,
            comment_text,
        }),
        headers: {
            'Content-Type': 'application/json'
        }

    });

    if (!response.ok) {
        alert(response.statusText);
    }
    console.log(response)
}

//delete comment function peer coded with Mark
async function deleteComment(btn) {
    const btnId = btn.id

    const commentId = btnId.split('-')[1];

    const comment_text = document.getElementById
        ("comment-update-" + commentId).textContent;
    console.log(comment_text)

    const game_id = document.getElementsByClassName("li-" + commentId)[0].id
    console.log(game_id)

    const response = await fetch('api/comments/' + commentId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        window.location.reload();
    } else {
        alert(response.statusText)
    }

}


// add event listener click to all the comment text areas

$('.h4-comment').on('click', 'p', (item) => {
    // deconstruct the window object and pull target
    const { target } = item
    // get p element from target
    const pEl = { target }.target
    // get id from text area element
    const pElId = pEl.id

    var text = $(pEl)
        .text()
        .trim()

    var textInput = $('<textarea>')
        .attr('id', pElId)
        .val(text);

    $(pEl).replaceWith(textInput);

    textInput.trigger('focus');
})

//  - hardcode the <p> content on blur
$('.h4-comment').on('blur', 'textarea', async function (item) {
    // deconstruct the window object and pull target
    const { target } = item
    
    // get p element from target
    const textareaEl = { target }.target
    
    // get id from text area element
    const textareaElId = textareaEl.id
    
    var text = $(textareaEl)
        .val()
        .trim()

    console.log(text);

    var textInput = $('<p>')
        .attr('id', textareaElId)
        .text(text);

    console.log(textInput);
    $(textareaEl).replaceWith(textInput);


})

