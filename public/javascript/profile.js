async function profilePictureHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const image = document.querySelector('#profile-pic').value.toString().split('\\')[document.querySelector('#profile-pic').value.toString().split('\\').length - 1];

    console.log(id);
    console.log(image);
    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            image
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace(`/profile/${id}`);
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#profile-pic-form').addEventListener('submit', profilePictureHandler);