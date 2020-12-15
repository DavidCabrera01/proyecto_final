
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const loginCheck = user =>{
    if(user){
        loggedInLinks.forEach(link => link.style.display = 'block');
        loggedOutLinks.forEach(link => link.style.display = 'none');
    }else{
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggedOutLinks.forEach(link => link.style.display = 'block');
    }
}

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit',(e)=>{
e.preventDefault();

const email = document.querySelector('#signup-email').value;
const password = document.querySelector('#signup-password').value;

auth
    .createUserWithEmailAndPassword(email,password)
    .then(userCredential =>{

        signupForm.reset();

        $('#signupModal').modal('hide');

        console.log("Sign up")
    })

});

//signin

const signinForm = document.querySelector('#login-form');

signinForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    console.log({email,password});

    auth
    .signInWithEmailAndPassword(email,password)
    .then(userCredential =>{

        signupForm.reset();

        $('#signinModal').modal('hide');

        console.log("Sign in")
    })
})

const logout = document.querySelector('#logout');

console.log("hola david")

logout.addEventListener('click',(e)=>{
    e.preventDefault();

    auth.signOut().then(()=>{
        console.log('sign out')
    })
})


//Google Login
const googleButton = document.querySelector('#googleLogin');

googleButton.addEventListener('click',(e)=>{
    e.preventDefault();
    signupForm.reset();

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result =>{
            console.log('google signIN')
            signupForm.reset();
            $('#signinModal').modal('hide');
        })
        .catch(err => {
            console.log(err);
        })
})

//Facebook Login
const facebookButton = document.querySelector("#facebookLogin");

facebookButton.addEventListener('click',e=>{
    e.preventDefault();

    const provider = new firebase.auth.FacebookAuthProvider();

    auth.signInWithPopup(provider)
        .then(result =>{
            console.log(result);
            console.log('facebook sign in')
        })
        .catch(err =>{
            console.log(err);
        })
})

//labs

const postList = document.querySelector('.practica');
const setupPosts = data =>{
    if(data.length){
        let html = '';
        data.forEach(doc =>{
            const post = doc.data();
            console.log(post);
            const div = `
    
            <a class="dropdown-item" href="${post.url}" target="_blank">${post.descripcion}</a>
               
            `;

            html += div;
        });

        postList.innerHTML = html;
    }else{
        postList.innerHTML = '<p class="text-center">Login to see potst'
    }
}

//resúmenes
const postList_1 = document.querySelector('.resumen');
const setupPosts_1 = data =>{
    if(data.length){
        let html = '';
        data.forEach(doc =>{
            const post = doc.data();
            console.log(post);
            const div = `
    
            <a class="dropdown-item" href="${post.url}" target="_blank">${post.descripcion}</a>
               
            `;

            html += div;
        });

        postList_1.innerHTML = html;
    }else{
        postList_1.innerHTML = '<p class="text-center">Login to see potst'
    }
}


//Events
//list for auth state changes

auth.onAuthStateChanged(user =>{
    if(user){
        fs.collection('labs')
            .get()
            .then((snapshot)=>{
                setupPosts(snapshot.docs);
                loginCheck(user);
            });

        fs.collection('resumenes')
            .get()
            .then((snapshot)=>{
                setupPosts_1(snapshot.docs);
                loginCheck(user);
            })
    }else{
        setupPosts([]);
        loginCheck(user);
    }
})