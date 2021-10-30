//Funciones para el manejo de la tabla MOTO:
function traerInformacionMoto() {
    $.ajax({
        url: 'http://129.151.118.73/api/Motorbike/all',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado").empty();
            let tablaMoto = '<div class="floatLeft"><div class="container" id="global"><div  class= "row">';

            for (i = 0; i < respuesta.length; i++) {
                tablaMoto += `
                <div class="card m-2">
                <div class="inBox">
                    <div class="card-body">			 
                    <h5 class ="card-title">  ${respuesta[i].id} - ${respuesta[i].brand}</h5>
                    <h6 class ="card-subtitle mb-2 text-muted">  ${respuesta[i].name} </h6>
                    <p class= "card-text"> ${respuesta[i].year} <br></p>
                    <p class= "card-text"> ${respuesta[i].description}</p>
                    <button class="btn btn-primary" onclick="editarRegistroMoto(${respuesta[i].id} )" >Editar</button>
                    <button  class="btn btn-danger" onclick="eliminarRegistroMoto(${respuesta[i].id} )">Borrar</button>
                    </div></div>
		</div>
                `;
            }

            tablaMoto += '</div></div></div>';
            $("#resultado").append(tablaMoto);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function guardarInformacionMoto() {
    let categoryObj = {id: $("#categoriesList").val()};
    let datosMoto = {
        name: $("#name").val(),
        brand: $("#brand").val(),
        year: $("#year").val(),
        description: $("#description").val(),
        category: categoryObj
    };
    let datosJson = JSON.stringify(datosMoto);
    if ($("#categoriesList").val() == 0) {
        alert(".::ERROR::. Debes seleccionar una categoría!");
    } else {
        $.ajax(
                'http://129.151.118.73/api/Motorbike/save',
                {
                    data: datosJson,
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",

                    statusCode: {
                        201: function () {
                            alert("Registro Guardado Exitosamente!");
                            $("#id").val("");
                            $("#name").val("");
                            $("#brand").val("");
                            $("#year").val("");
                            $("#description").val("");
                            $("#categoriesList").val(0);
                            traerInformacionMoto();
                        }
                    }
                });
    }
}

function editarRegistroMoto(idMoto) {
    $.ajax({
        url: 'http://129.151.118.73/api/Motorbike/' + idMoto,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#id").val(respuesta.id);
            $("#name").val(respuesta.name);
            $("#brand").val(respuesta.brand);
            $("#year").val(respuesta.year);
            $("#description").val(respuesta.description);
            $("#categoriesList").val(respuesta.category.id);
            $("#id").prop("readonly", true);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function actualizarInformacionMoto() {
    let categoryObj = {id: $("#categoriesList").val()};
    let datosMoto = {
        id: $("#id").val(),
        name: $("#name").val(),
        brand: $("#brand").val(),
        year: $("#year").val(),
        description: $("#description").val(),
        category: categoryObj
    };
    let datosJson = JSON.stringify(datosMoto);
    if ($("#categoriesList").val() == 0) {
        alert(".::ERROR::. Debes seleccionar una categoría!");
    } else {
        $.ajax(
                'http://129.151.118.73/api/Motorbike/update',
                {
                    data: datosJson,
                    type: 'PUT',
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",

                    statusCode: {
                        201: function () {
                            alert("Registro Actualizado Exitosamente!");
                            $("#id").val("");
                            $("#name").val("");
                            $("#brand").val("");
                            $("#year").val("");
                            $("#description").val("");
                            $("#categoriesList").val(0);
                            traerInformacionMoto();
                        }
                    }
                });
    }
}

function eliminarRegistroMoto(idMoto) {
    $.ajax(
            'http://129.151.118.73/api/Motorbike/' + idMoto,
            {
                type: 'DELETE',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    204: function () {
                        alert("Registro Borrado Exitosamente!");
                        traerInformacionMoto();
                    }
                }
            });
}

function limpiarCamposMoto() {
    $("#id").val("");
    $("#name").val("");
    $("#brand").val("");
    $("#year").val("");
    $("#description").val("");
    $("#categoriesList").val(0);
    $("#id").prop("readonly", false);
}

//Funciones para el manejo de la tabla CATEGORÍAS:
function traerInformacionCategoria() {
    $.ajax({
        url: 'http://129.151.118.73/api/Category/all',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado").empty();
            let tablaCategorias = '<div class="floatLeft" id="global"><div class="container"><div  class= "row">';
            for (i = 0; i < respuesta.length; i++) {
                tablaCategorias += `
                <div class="card m-2">
                <div class="inBox">
                    <div class="card-body">			 
                    <h5 class ="card-title">  ${respuesta[i].id} - ${respuesta[i].name}</h5>
                    <p class= "card-text"> ${respuesta[i].description}<br></p><br>
                    <button class="btn btn-primary" onclick="editarRegistroCategoria(${respuesta[i].id} )" >Editar</button>
                    <button  class="btn btn-danger" onclick="eliminarRegistroCategoria(${respuesta[i].id} )">Borrar</button>
                    </div></div>
		</div>
                `;
            }

            tablaCategorias += '</div></div></div>';
            $("#resultado").append(tablaCategorias);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function guardarInformacionCategoria() {
    let datosCategorias = {
        id: $("#id").val(),
        name: $("#name").val(),
        description: $("#description").val()
    };
    let datosJson = JSON.stringify(datosCategorias);
    $.ajax(
            'http://129.151.118.73/api/Category/save',
            {
                data: datosJson,
                type: 'POST',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    201: function () {
                        alert("Registro Guardado Exitosamente!");
                        $("#id").val("");
                        $("#name").val("");
                        $("#description").val("");
                        traerInformacionCategoria();
                    }
                }
            });
}

function editarRegistroCategoria(idCategoria) {
    $.ajax({
        url: 'http://129.151.118.73/api/Category/' + idCategoria,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#id").val(respuesta.id);
            $("#name").val(respuesta.name);
            $("#description").val(respuesta.description);
            $("#id").prop("readonly", true);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function actualizarInformacionCategoria() {
    let datosCategoria = {
        id: $("#id").val(),
        name: $("#name").val(),
        description: $("#description").val()
    };
    let datosJson = JSON.stringify(datosCategoria);
    $.ajax(
            'http://129.151.118.73/api/Category/update',
            {
                data: datosJson,
                type: 'PUT',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    201: function () {
                        alert("Registro Actualizado Exitosamente!");
                        $("#id").val("");
                        $("#name").val("");
                        $("#description").val("");
                        traerInformacionCategoria();
                    }
                }
            });
}

function eliminarRegistroCategoria(idCategoria) {
    $.ajax(
            'http://129.151.118.73/api/Category/' + idCategoria,
            {
                type: 'DELETE',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    204: function () {
                        alert("Registro Borrado Exitosamente!");
                        traerInformacionCategoria();
                    }
                }
            });
}

function limpiarCamposCategoria() {
    $("#id").val("");
    $("#name").val("");
    $("#description").val("");
    $("#id").prop("readonly", false);
}

//Funciones para el manejo de la tabla CLIENTE:
function traerInformacionCliente() {
    $.ajax({
        url: 'http://129.151.118.73/api/Client/all',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado").empty();
            let tablaClientes = '<div class="floatLeft"><div class="container" id="global"><div  class= "row">';
            for (i = 0; i < respuesta.length; i++) {
                tablaClientes += `
                <div class="card m-2">
                <div class="inBox">
                    <div class="card-body">			 
                    <h5 class ="card-title">  ${respuesta[i].idClient} - ${respuesta[i].name}</h5>
                    <h6 class ="card-subtitle mb-2 text-muted">  ${respuesta[i].email} </h6>
                    <p class= "card-text"> <b>Password:</b> ${respuesta[i].password} <br>
                    <b>Edad:</b> ${respuesta[i].age}</p>
                    <button class="btn btn-primary" onclick="editarRegistroCliente(${respuesta[i].idClient} )" >Editar</button>
                    <button  class="btn btn-danger" onclick="eliminarRegistroCliente(${respuesta[i].idClient} )">Borrar</button>
                    </div></div>
		</div>
            `;
            }

            tablaClientes += '</div></div></div>';
            $("#resultado").append(tablaClientes);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function guardarInformacionCliente() {
    let datosCliente = {
        idClient: $("#idClient").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        name: $("#name").val(),
        age: $("#age").val()
    };
    let datosJson = JSON.stringify(datosCliente);
    $.ajax(
            'http://129.151.118.73/api/Client/save',
            {
                data: datosJson,
                type: 'POST',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    201: function () {
                        alert("Registro Guardado Exitosamente!");
                        $("#idClient").val("");
                        $("#email").val("");
                        $("#password").val("");
                        $("#name").val("");
                        $("#age").val("");
                        traerInformacionCliente();
                    }
                }
            });
}

function editarRegistroCliente(idCliente) {
    $.ajax({
        url: 'http://129.151.118.73/api/Client/' + idCliente,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#idClient").val(respuesta.idClient);
            $("#email").val(respuesta.email);
            $("#password").val(respuesta.password);
            $("#name").val(respuesta.name);
            $("#age").val(respuesta.age);
            $("#idClient").prop("readonly", true);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function actualizarInformacionCliente() {
    let datosCliente = {
        idClient: $("#idClient").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        description: $("#description").val()
    };
    let datosJson = JSON.stringify(datosCliente);
    $.ajax(
            'http://129.151.118.73/api/Client/update',
            {
                data: datosJson,
                type: 'PUT',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    201: function () {
                        alert("Registro Actualizado Exitosamente!");
                        $("#idClient").val("");
                        $("#email").val("");
                        $("#password").val("");
                        $("#name").val("");
                        $("#age").val("");
                        traerInformacionCliente();
                    }
                }
            });
}

function eliminarRegistroCliente(idCliente) {
    $.ajax(
            'http://129.151.118.73/api/Client/' + idCliente,
            {
                type: 'DELETE',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    204: function () {
                        alert("Registro Borrado Exitosamente!");
                        traerInformacionCliente();
                    }
                }
            });
}

function limpiarCamposCliente() {
    $("#idClient").val("");
    $("#email").val("");
    $("#password").val("");
    $("#name").val("");
    $("#age").val("");
    $("#idClient").prop("readonly", false);
}

//Funciones para el manejo de la tabla MENSAJES:
function traerInformacionMensaje() {
    $.ajax({
        url: 'http://129.151.118.73/api/Message/all',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado").empty();
            let tablaMensajes = '<div class="floatLeft"><div class="container" id="global"><div class="row">';
            for (i = 0; i < respuesta.length; i++) {
                tablaMensajes += `
                <div class="card m-2">
                <div class="inBox">
                    <div class="card-body">			 
                    <h5 class ="card-title">  ${respuesta[i].idMessage} - ${respuesta[i].client.name} </h5>
                    <h6 class ="card-subtitle mb-2 text-muted"> Moto: ${respuesta[i].motorbike.id} - ${respuesta[i].motorbike.name} </h6>
                    <p class= "card-text"> ${respuesta[i].messageText}</p>
                    <button class="btn btn-primary" onclick="editarRegistroMensaje(${respuesta[i].idMessage} )" >Editar</button>
                    <button  class="btn btn-danger" onclick="eliminarRegistroMensaje(${respuesta[i].idMessage} )">Borrar</button>
                    </div></div>
		</div>
                `;
            }

            tablaMensajes += '</div></div></div>';
            $("#resultado").append(tablaMensajes);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function guardarInformacionMensaje() {
    let clientObj = {idClient: $("#clientsList").val()};
    let motorbikeObj = {id: $("#motorbikesList").val()};
    let datosMensaje = {
        idMessage: $("#idMessage").val(),
        messageText: $("#messageText").val(),
        client: clientObj,
        motorbike: motorbikeObj
    };
    let datosJson = JSON.stringify(datosMensaje);
    if ($("#clientsList").val() == 0) {
        alert(".::ERROR::. Debes seleccionar un cliente!");
    } else {
        if ($("#motorbikesList").val() == 0) {
            alert(".::ERROR::. Debes seleccionar una moto!");
        } else {
            $.ajax(
                    'http://129.151.118.73/api/Message/save',
                    {
                        data: datosJson,
                        type: 'POST',
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",

                        statusCode: {
                            201: function () {
                                alert("Registro Guardado Exitosamente!");
                                $("#idMessage").val("");
                                $("#messageText").val("");
                                $("#clientsList").val(0);
                                $("#motorbikesList").val(0);
                                traerInformacionMensaje();
                            }
                        }
                    });
        }
    }
}

function editarRegistroMensaje(idMensaje) {
    $.ajax({
        url: 'http://129.151.118.73/api/Message/' + idMensaje,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#idMessage").val(respuesta.idMessage);
            $("#messageText").val(respuesta.messageText);
            $("#clientsList").val(respuesta.client.idClient);
            $("#motorbikesList").val(respuesta.motorbike.id);
            $("#idMessage").prop("readonly", true);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function actualizarInformacionMensaje() {
    let clientObj = {idClient: $("#clientsList").val()};
    let motorbikeObj = {id: $("#motorbikesList").val()};
    let datosMensaje = {
        idMessage: $("#idMessage").val(),
        messageText: $("#messageText").val(),
        client: clientObj,
        motorbike: motorbikeObj
    };
    let datosJson = JSON.stringify(datosMensaje);
    if ($("#clientsList").val() == 0) {
        alert(".::ERROR::. Debes seleccionar un cliente!");
    } else {
        if ($("#motorbikesList").val() == 0) {
            alert(".::ERROR::. Debes seleccionar una moto!");
        } else {
            $.ajax(
                    'http://129.151.118.73/api/Message/update',
                    {
                        data: datosJson,
                        type: 'PUT',
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",

                        statusCode: {
                            201: function () {
                                alert("Registro Actualizado Exitosamente!");
                                $("#idMessage").val("");
                                $("#messageText").val("");
                                $("#clientsList").val(0);
                                $("#motorbikesList").val(0);
                                traerInformacionMensaje();
                            }
                        }
                    });
        }
    }
}

function eliminarRegistroMensaje(idMensaje) {
    $.ajax(
            'http://129.151.118.73/api/Message/' + idMensaje,
            {
                type: 'DELETE',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    204: function () {
                        alert("Registro Borrado Exitosamente!");
                        traerInformacionMensaje();
                    }
                }
            });
}

function limpiarCamposMensaje() {
    $("#idMessage").val("");
    $("#messageText").val("");
    $("#clientsList").val(0);
    $("#motorbikesList").val(0);
    $("#idMessage").prop("readonly", false);
}

//Funciones para el manejo de la tabla RESERVACIONES:
function traerInformacionReservacion() {
    $.ajax({
        url: 'http://129.151.118.73/api/Reservation/all',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado").empty();
            let tablaReservaciones = '<div class="floatLeft"><div class="container" id="global"><div  class= "row">';
            for (i = 0; i < respuesta.length; i++) {
                tablaReservaciones += `
                <div class="card m-2">
                <div class="inBox">
                    <div class="card-body">			 
                    <h5 class ="card-title">  ${respuesta[i].idReservation} - ${respuesta[i].client.name}</h5>
                    <h6 class ="card-subtitle mb-2 text-muted"> Moto: ${respuesta[i].motorbike.id} - ${respuesta[i].motorbike.name} </h6>
                    <p class= "card-text"><h6> <b>Estado:</b> ${respuesta[i].status}<br><br>
                    <b>Fecha1:</b> ${respuesta[i].startDate.slice(0, 10)} <br>
                    <b>Fecha2:</b> ${respuesta[i].devolutionDate.slice(0, 10)}</p>
                    <button class="btn btn-primary" onclick="editarRegistroReservacion(${respuesta[i].idReservation} )" >Editar</button>
                    <button  class="btn btn-danger" onclick="eliminarRegistroReservacion(${respuesta[i].idReservation} )">Borrar</button>
                    </div></div>
		</div>
                `;
            }

            tablaReservaciones += '</div></div></div>';
            $("#resultado").append(tablaReservaciones);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function guardarInformacionReservacion() {
    let clientObj = {idClient: $("#clientsList").val()};
    let motorbikeObj = {id: $("#motorbikesList").val()};
    let datosReservacion = {
        idReservation: $("#idReservation").val(),
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        client: clientObj,
        motorbike: motorbikeObj
    };
    let datosJson = JSON.stringify(datosReservacion);
    if ($("#clientsList").val() == 0) {
        alert(".::ERROR::. Debes seleccionar un cliente!");
    } else {
        if ($("#motorbikesList").val() == 0) {
            alert(".::ERROR::. Debes seleccionar una moto!");
        } else {
            $.ajax(
                    'http://129.151.118.73/api/Reservation/save',
                    {
                        data: datosJson,
                        type: 'POST',
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",

                        statusCode: {
                            201: function () {
                                alert("Registro Guardado Exitosamente!");
                                $("#idReservation").val("");
                                $("#startDate").val("");
                                $("#devolutionDate").val("");
                                $("#clientsList").val(0);
                                $("#motorbikesList").val(0);
                                traerInformacionReservacion();
                            }
                        }
                    });
        }
    }
}

function editarRegistroReservacion(idReservacion) {
    $.ajax({
        url: 'http://129.151.118.73/api/Reservation/' + idReservacion,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            let fecha1 = respuesta.startDate.slice(0, 10);
            let fecha2 = respuesta.devolutionDate.slice(0, 10);
            console.log(respuesta);
            $("#idReservation").val(respuesta.idReservation);
            $("#startDate").val(fecha1);
            $("#devolutionDate").val(fecha2);
            $("#clientsList").val(respuesta.client.idClient);
            $("#motorbikesList").val(respuesta.motorbike.id);
            $("#idReservation").prop("readonly", true);
        },

        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function actualizarInformacionReservacion() {
    let clientObj = {idClient: $("#clientsList").val()};
    let motorbikeObj = {id: $("#motorbikesList").val()};
    let datosReservacion = {
        idReservation: $("#idReservation").val(),
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        client: clientObj,
        motorbike: motorbikeObj
    };
    let datosJson = JSON.stringify(datosReservacion);
    if ($("#clientsList").val() == 0) {
        alert(".::ERROR::. Debes seleccionar un cliente!");
    } else {
        if ($("#motorbikesList").val() == 0) {
            alert(".::ERROR::. Debes seleccionar una moto!");
        } else {
            $.ajax(
                    'http://129.151.118.73/api/Reservation/update',
                    {
                        data: datosJson,
                        type: 'PUT',
                        dataType: 'json',
                        contentType: "application/json; charset=utf-8",

                        statusCode: {
                            201: function () {
                                alert("Registro Actualizado Exitosamente!");
                                $("#idReservation").val("");
                                $("#startDate").val("");
                                $("#devolutionDate").val("");
                                $("#clientsList").val(0);
                                $("#motorbikesList").val(0);
                                traerInformacionReservacion();
                            }
                        }
                    });
        }
    }
}

function eliminarRegistroReservacion(idReservacion) {
    $.ajax(
            'http://129.151.118.73/api/Reservation/' + idReservacion,
            {
                type: 'DELETE',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    204: function () {
                        alert("Registro Borrado Exitosamente!");
                        traerInformacionReservacion();
                    }
                }
            });
}

function reportsReservation() {
    if ($("#reportsR").val() == 0) {
        alert(".::ERROR::. Debes seleccionar un Reporte!");
    } else if ($("#reportsR").val() == 1) {
        reportReservationAmount();
    } else if ($("#reportsR").val() == 2) {
        reportReservationStatus();
    } else {
        reportReservationClient();
    }
}

function reportReservationAmount() {
    if ($("#startDate").val()=="" || $("#devolutionDate").val()=="") {
        alert(".::ERROR::. Debes seleccionar un Rango de Fechas!");
    } else {
    $.ajax({
        url: 'http://129.151.118.73/api/Reservation/report-dates/' + $("#startDate").val() + '/' + $("#devolutionDate").val(),
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (report1) {
            console.log(report1);
            $("#resultado").empty();
            
            let tablaReportR1 = '<div class="floatLeft" id="global"><table>';
            tablaReportR1 += '<th>' + "ID RESERV" + '</th>';
            tablaReportR1 += '<th>' + "STATUS" + '</th>';
            tablaReportR1 += '<th>' + "START DATE" + '</th>';

            for (i = 0; i < report1.length; i++) {
                tablaReportR1 += '<tr>';
                tablaReportR1 += '<td>' + report1[i].idReservation + '</td>';
                tablaReportR1 += '<td>' + report1[i].status + '</td>';
                tablaReportR1 += '<td>' + report1[i].startDate.slice(0, 10) + '</td>';
                tablaReportR1 += '</tr>';
            }
            tablaReportR1 += '</table></div>';
            $("#resultado").append(tablaReportR1);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });}
}

function reportReservationStatus(){
    $.ajax({
        url: 'http://129.151.118.73/api/Reservation/report-status',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (report2) {
            $("#resultado").empty();
            let tablaReportR2 = '<div class="floatLeft" id="global"><table>';
            tablaReportR2 += '<th>' + "COMPLETED" + '</th>';
            tablaReportR2 += '<th>' + "CANCELLED" + '</th>';
                tablaReportR2 += '<tr>';
                tablaReportR2 += '<td>' + report2.completed + '</td>';
                tablaReportR2 += '<td>' + report2.cancelled + '</td>';
                tablaReportR2 += '</tr>';

            tablaReportR2 += '</table></div>';
            $("#resultado").append(tablaReportR2);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function reportReservationClient(){
    $.ajax({
        url: 'http://129.151.118.73/api/Reservation/report-clients',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (report3) {
            console.log(report3);
            $("#resultado").empty();
            
            let tablaReportR3 = '<div class="floatLeft" id="global"><table>';
            tablaReportR3 += '<th>' + "ID CLIENT" + '</th>';
            tablaReportR3 += '<th>' + "NAME CLIENT" + '</th>';
            tablaReportR3 += '<th>' + "TOTAL RESERV" + '</th>';

            for (i = 0; i < report3.length; i++) {
                tablaReportR3 += '<tr>';
                tablaReportR3 += '<td>' + report3[i].client.idClient + '</td>';
                tablaReportR3 += '<td>' + report3[i].client.name + '</td>';
                tablaReportR3 += '<td>' + report3[i].total + '</td>';
                tablaReportR3 += '</tr>';
            }
            tablaReportR3 += '</table></div>';
            $("#resultado").append(tablaReportR3);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function limpiarCamposReservacion() {
    $("#idReservation").val("");
    $("#startDate").val("");
    $("#devolutionDate").val("");
    $("#clientsList").val(0);
    $("#motorbikesList").val(0);
    $("#idReservacion").prop("readonly", false);
}

//Funciones para el manejo de la tabla ADMIN:
function traerInformacionAdmin() {
    $.ajax({
        url: 'http://129.151.118.73/api/Admin/all',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado").empty();
            let tablaAdmin = '<div class="floatLeft"><div class="container" id="global"><div  class= "row">';
            for (i = 0; i < respuesta.length; i++) {
                tablaAdmin += `
                <div class="card m-2">
                <div class="inBox">
                    <div class="card-body">			 
                    <h5 class ="card-title">  ${respuesta[i].idAdmin} - ${respuesta[i].userName}</h5>
                    <p class= "card-text"> <b>E-Mail:</b> ${respuesta[i].email} <br>
                    <b>Password:</b> ${respuesta[i].password}</p>
                    <button class="btn btn-primary" onclick="editarRegistroAdmin(${respuesta[i].idAdmin} )" >Editar</button>
                    <button  class="btn btn-danger" onclick="eliminarRegistroAdmin(${respuesta[i].idAdmin} )">Borrar</button>
                    </div></div>
		</div>
                `;
            }

            tablaAdmin += '</div></div></div>';
            $("#resultado").append(tablaAdmin);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function guardarInformacionAdmin() {
    let datosAdmin = {
        email: $("#email").val(),
        password: $("#password").val(),
        userName: $("#userName").val()
    };
    let datosJson = JSON.stringify(datosAdmin);
    $.ajax(
            'http://129.151.118.73/api/Admin/save',
            {
                data: datosJson,
                type: 'POST',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    201: function () {
                        alert("Registro Guardado Exitosamente!");
                        $("#idAdmin").val("");
                        $("#email").val("");
                        $("#password").val("");
                        $("#userName").val("");
                        traerInformacionAdmin();
                    }
                }
            });
}

function editarRegistroAdmin(idAdmin) {
    $.ajax({
        url: 'http://129.151.118.73/api/Admin/' + idAdmin,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#idAdmin").val(respuesta.idAdmin);
            $("#email").val(respuesta.email);
            $("#password").val(respuesta.password);
            $("#userName").val(respuesta.userName);
            $("#idAdmin").prop("readonly", true);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function actualizarInformacionAdmin() {
    let datosAdmin = {
        idAdmin: $("#idAdmin").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        userName: $("#userName").val()
    };
    let datosJson = JSON.stringify(datosAdmin);
    $.ajax(
            'http://129.151.118.73/api/Admin/update',
            {
                data: datosJson,
                type: 'PUT',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    201: function () {
                        alert("Registro Actualizado Exitosamente!");
                        $("#idAdmin").val("");
                        $("#email").val("");
                        $("#password").val("");
                        $("#userName").val("");
                        traerInformacionAdmin();
                    }
                }
            });
}

function eliminarRegistroAdmin(idAdmin) {
    $.ajax(
            'http://129.151.118.73/api/Admin/' + idAdmin,
            {
                type: 'DELETE',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    204: function () {
                        alert("Registro Borrado Exitosamente!");
                        traerInformacionAdmin();
                    }
                }
            });
}

function limpiarCamposAdmin() {
    $("#idAdmin").val("");
    $("#email").val("");
    $("#password").val("");
    $("#userName").val("");
    $("#idAdmin").prop("readonly", false);
}

//Funciones para el manejo de la tabla SCORE:
function traerInformacionScore() {
    $.ajax({
        url: 'http://129.151.118.73/api/Score/all',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#resultado").empty();
            let tablaScore = '<div class="floatLeft"><div class="container" id="global"><div  class= "row">';
            for (i = 0; i < respuesta.length; i++) {
                tablaScore += `
                <div class="card m-2">
                <div class="inBox">
                    <div class="card-body">			 
                    <h5 class ="card-title">  ${respuesta[i].idScore} - Reservation: ${respuesta[i].reservation.idReservation}</h5>
                    <h6 class ="card-subtitle mb-2 text-muted"> Calificación: ${respuesta[i].stars} </h6>
                    <p class= "card-text"> ${respuesta[i].messageText}</p> <br>
                    <button class="btn btn-primary" onclick="editarRegistroScore(${respuesta[i].idScore} )" >Editar</button>
                    <button  class="btn btn-danger" onclick="eliminarRegistroScore(${respuesta[i].idScore} )">Borrar</button>
                    </div></div>
		</div>
                `;
            }

            tablaScore += '</div></div></div>';
            $("#resultado").append(tablaScore);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function guardarInformacionScore() {
    let reservationObj = {idReservation: $("#reservationList").val()};
    let datosScore = {
        stars: parseInt($("#stars").val()),
        messageText: $("#messageText").val(),
        reservation: reservationObj
    };
    //alert($("#satrs").val());
    let datosJson = JSON.stringify(datosScore);
    if ($("#reservationList").val() == 0) {
        alert(".::ERROR::. Debes seleccionar una reservación!");
    } else {
        $.ajax(
                'http://129.151.118.73/api/Score/save',
                {
                    data: datosJson,
                    type: 'POST',
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",

                    statusCode: {
                        201: function () {
                            alert("Registro Guardado Exitosamente!");
                            $("#idScore").val("");
                            $("#stars").val(-1);
                            $("#messageText").val("");
                            $("#reservationList").val(0);
                            traerInformacionScore();
                        }
                    }
                });
    }
}

function editarRegistroScore(idScore) {
    $.ajax({
        url: 'http://129.151.118.73/api/Score/' + idScore,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#idScore").val(respuesta.idScore);
            $("#stars").val(respuesta.stars);
            $("#messageText").val(respuesta.messageText);
            $("#reservationList").val(respuesta.reservation.idReservation);
            $("#ididScore").prop("readonly", true);
        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function actualizarInformacionScore() {
    let reservationObj = {id: $("#reservationList").val()};
    let datosScore = {
        idScore: $("#idScore").val(),
        stars: $("#stars").val(),
        messageText: $("#messageText").val(),
        reservation: reservationObj
    };
    let datosJson = JSON.stringify(datosScore);
    if ($("#reservationList").val() == 0) {
        alert(".::ERROR::. Debes seleccionar una reservación!");
    } else {
        $.ajax(
                'http://129.151.118.73/api/Score/update',
                {
                    data: datosJson,
                    type: 'PUT',
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",

                    statusCode: {
                        201: function () {
                            alert("Registro Actualizado Exitosamente!");
                            $("#idScore").val("");
                            $("#stars").val(-1);
                            $("#messageText").val("");
                            $("#reservationList").val(0);
                            traerInformacionScore();
                        }
                    }
                });
    }
}

function eliminarRegistroScore(idScore) {
    $.ajax(
            'http://129.151.118.73/api/Score/' + idScore,
            {
                type: 'DELETE',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",

                statusCode: {
                    204: function () {
                        alert("Registro Borrado Exitosamente!");
                        traerInformacionScore();
                    }
                }
            });
}

function limpiarCamposScore() {
    $("#idScore").val("");
    $("#stars").val("");
    $("#messageText").val("");
    $("#reservationList").val(0);
    $("#idScore").prop("readonly", false);
}

//Funciones para listas desplegables:
function listarCategorias() {

    $.ajax({
        url: 'http://129.151.118.73/api/Category/all',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#categoriesList").empty();
            misCategories = "";
            misCategories += '<option value=' + 0 + '>Escoge una categoría</option>';
            for (i = 0; i < respuesta.length; i++) {
                misCategories += '<option value=' + respuesta[i].id + '>' + respuesta[i].name + '</option>';
            }

            $("#categoriesList").append(misCategories);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function listarClientes() {
    $.ajax({
        url: 'http://129.151.118.73/api/Client/all',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#clientsList").empty();
            misClientes = "";
            misClientes += '<option value=' + 0 + '>Escoge un cliente</option>';
            for (i = 0; i < respuesta.length; i++) {
                misClientes += '<option value=' + respuesta[i].idClient + '>' + respuesta[i].name + '</option>';
            }

            $("#clientsList").append(misClientes);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function listarMotos() {
    $.ajax({
        url: 'http://129.151.118.73/api/Motorbike/all',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#motorbikesList").empty();
            misMotos = "";
            misMotos += '<option value=' + 0 + '>Escoge una moto</option>';
            for (i = 0; i < respuesta.length; i++) {
                misMotos += '<option value=' + respuesta[i].id + '>' + respuesta[i].name + '</option>';
            }

            $("#motorbikesList").append(misMotos);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}

function listarReservaciones() {
    $.ajax({
        url: 'http://129.151.118.73/api/Reservation/all',
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function (respuesta) {
            console.log(respuesta);
            $("#reservationList").empty();
            misReservaciones = "";
            misReservaciones += '<option value=' + 0 + '>Escoge una reservación</option>';
            for (i = 0; i < respuesta.length; i++) {
                misReservaciones += '<option value=' + respuesta[i].idReservation + '>' + respuesta[i].idReservation + '</option>';
            }

            $("#reservationList").append(misReservaciones);

        },
        error: function (xhr, status) {
            alert('Ha sucedido un problema:' + status + json);
        }
    });
}
