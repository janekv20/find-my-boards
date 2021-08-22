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

    const username = $('#profile-username').text()

    getFollowingIds(username)

        .then((followIdArray) => {

            for (let i = 0; i < followIdArray.length; i++) {
                const followId = $('#follow-id').text()

                const unfollowBtn = $('<button>')
                    .addClass('btn btn-primary')
                    .html('<i class="fas fa-user-minus"></i>')
                    .attr({
                        type: 'button',
                        id: 'unfollow-btn'
                    })
                    .on('click', async function () {
                        const response = await fetch(`/api/followings/${followId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (response.ok) {
                            $(this).closest('li').remove();
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

function editComment() {
    const comment_text = document.getElementById
    ("comment-update").textContent;
    console.log(comment_text)


}

editButton.addEventListener("click", editComment);