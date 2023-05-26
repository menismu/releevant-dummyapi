function init(numeroPagina) {
    let numUsuarios = 10;

    let p;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        let state = this.readyState;
        let status = this.status;
        let response = this.responseText;

        p = new Promise(function(resolve, reject) {
            if (state == 4 && status == 200) {
                resolve(response);
            } else if (state == 4) {
                reject("Error: ");
            }
        });

        p.then(sustituirLista).catch(error);
    }

    let url = `https://dummyapi.io/data/v1/user?limit=${numUsuarios}&page=${numeroPagina-1}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("app-id", "614c809883d7ac75ac446ba1");
    xhttp.send();
}

function sustituirLista(responseText) {
    let usuarios = JSON.parse(responseText);
    let ulElement = document.getElementById("lista-ultimos-usuarios");
    let paginationElement = document.getElementById("paginacion");
    
    ulElement.innerHTML = "<li>Foto, Titulo, Nombre, Apellidos</li>";

    for (const usuario of usuarios.data) {
        ulElement.innerHTML += "<li><a href='usuario.html?id=" + usuario.id + "'>" +
        "<img width='100' height='60' " +  
        "src='" + usuario.picture + "'/></a>" + 
        usuario.title + ", " + usuario.firstName + ", " + usuario.lastName + "</li>";
    }

    let paginacion = "";
    for (let i = 1; i <= usuarios.total / usuarios.limit; i++) {
        paginacion += `<a href="#" onclick="init(${i})">${i}</a>, `;
    }

    let ultimaPagina = parseInt(usuarios.total / usuarios.limit) + 1;
    paginacion += `<a href="#" onclick="init(${ultimaPagina})">${ultimaPagina}</a>`;

    paginationElement.innerHTML = paginacion;
}

function error(textoError) {
    let ulElement = document.getElementById("lista-ultimos-usuarios");

    ulElement.innerHTML = textoError;
}

function userInit() {
    let userId = new URLSearchParams(window.location.search).get("id");
    let container = document.getElementById("container");
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let usuario = JSON.parse(this.responseText);
            
            console.log(usuario);

            container.innerHTML = `<p>
            <img src="${usuario.picture}">
        </p>
        <p>
            <b>ID:</b> ${usuario.id}<br/>
            <b>${usuario.title.toUpperCase()}. ${usuario.firstName} ${usuario.lastName}</b><br/>
            <b>Gender:</b> ${usuario.gender}<br/>
            <b>Date of Birth:</b> ${usuario.dateOfBirth}<br/>
            <b>Register Date:</b> ${usuario.registerDate}<br/>
        </p>
        <p>
            <b>Email:</b> ${usuario.email}<br/>
            <b>Phone:</b> ${usuario.phone}</br>
        </p>
        <p>
            <b>Address</b></br>
            <b>State:</b> ${usuario.location.state}<br/>
            <b>Street:</b> ${usuario.location.street}<br/>
            <b>City:</b> ${usuario.location.city}</br>
            <b>Country:</b> ${usuario.location.country}<br/>
            <b>Timezone:</b> ${usuario.location.timezone}<br/>
        </p>`
        }
    };

    let url = `https://dummyapi.io/data/v1/user/${userId}`;
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("app-id", "614c809883d7ac75ac446ba1");
    xhttp.send();
}

function productosDestacados() {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            let productosDestacados = JSON.parse(this.responseText);
            for (let p of productosDestacados) {
                console.log(`${p.nombre}, ${p.precio}, ${p.stock}`);
            }
        }
    };

    http.open("GET", "http://127.0.0.1:8000/productosdestacados");
    http.send();
}