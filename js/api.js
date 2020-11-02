let base_url = "https://api.football-data.org/v2/";

let API_TOKEN =  {     
    headers: {           
      'X-Auth-Token': '81bd88db68914c3cbee415750e68ea54'
    }
  };

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
// 1. kode get data teams la liga
let getteam = "competitions/2014/teams/";
function getAllTeams() {
    if ('caches' in window) {
        caches.match(base_url + getteam, API_TOKEN).then((response) => {
          if (response) {
            response.json().then((data) => {
              let allteamHTML = "";
              data.teams.forEach((team) => {                
                allteamHTML += `                
                    <div class="card cardhome" style="height:300px; margin-right:4px;">                      
                        <a href="./article.html?id=${team.id}">   
                          <div class="card-image waves-effect waves-block waves-light" style="height:220px;">                         
                            <img class="responsive-img" style="margin-top:20px; margin-left:auto; margin-right:auto; width:250px; height:200px;" src="${team.crestUrl}" alt="club image" />
                          </div>                       
                        </a>
                        <div class="card-content cyan lighten-4" style="margin-top:15px; height:200px;">                         
                          <span class="card-title truncate" style="font-weight:bold;">${team.name}</span>
                          <p style="font-size:14px; font-weight:bold;"> Address:</p> 
                          <p style="font-size:14px;">${team.address}</p> 
                          <br> 
                          <p style="font-size:14px; font-weight:bold;"> Website:</p> 
                          <p style="font-size:14px; color:#37474f;"><a href="${team.website}" onMouseOver="this.style.color='blue'" onMouseOut="this.style.color='#37474f'" style="color:#37474f;" target="_blank" rel="noopener">${team.website}</a></p>                       
                        </div>                  
                    </div>
                  `;
              });
            
              document.getElementById("allteams").innerHTML = allteamHTML;
      })
    }
  })
}

fetch(base_url + getteam, API_TOKEN)
  .then(status)
  .then(json)
  .then((data) => {
    // Objek/array JavaScript dari response.json() masuk lewat data.
    let allteamHTML ="" ;
    data.teams.forEach((team) => {
      allteamHTML += `       
      <div class="card cardhome" style="width:300px; margin-right:4px;">          
          <a href="./article.html?id=${team.id}">   
            <div class="card-image waves-effect waves-block waves-light" style="height:220px;">      
              <img class="responsive-img" style="margin-top:20px; margin-left:auto; margin-right:auto; width:250px; height:200px;" src="${team.crestUrl}" alt="club image" />
            </div>                       
          </a>
          <div class="card-content cyan lighten-4" style="margin-top:15px; height:200px;">           
            <span class="card-title truncate" style="font-weight:bold;">${team.name}</span>
            <p style="font-size:14px; font-weight:bold;"> Address:</p> 
            <p style="font-size:14px;">${team.address}</p> 
            <br> 
            <p style="font-size:14px; font-weight:bold;"> Website:</p> 
            <p style="font-size:14px; color:#37474f;"><a href="${team.website}" onMouseOver="this.style.color='blue'" onMouseOut="this.style.color='#37474f'" style="color:#37474f;" target="_blank" rel="noopener">${team.website}</a></p>                    
          </div>
        </div>          
        `;
  });

  document.getElementById("allteams").innerHTML = allteamHTML;

  })    
  .catch(error);
}
// akhir kode get data teams la liga

// 2. kode get data klasemen la liga
let getklasemen ="competitions/2014/standings/";
function getAllKlasemen() {
  if ('caches' in window) {
      caches.match(base_url + getklasemen, API_TOKEN).then((response) => {
        if (response) {
          response.json().then((data) => {           
            let winner =  data.standings[0];
            let klasemenHTML = "";
                winner.table.forEach((hasil) => {
                klasemenHTML += `                      
                    <tr>                      
                      <td class="center-align">${hasil.position}</td>                     
                      <td class="klasemen">${hasil.team.name}
                        <p>
                          <img class="responsive-img hide-on-small-only" style="width:40px; height:40px;" src="${hasil.team.crestUrl}" alt="club image" />
                        </p>
                      </td>                     
                      <td class="center-align">${hasil.won}</td>
                      <td class="center-align">${hasil.draw}</td>
                      <td class="center-align">${hasil.lost}</td>
                      <td class="center-align">${hasil.points}</td>                  
                    </tr>                          
                  `;            
          });
        
          document.getElementById("klasemens").innerHTML = klasemenHTML;

      })
    }
  })
}

fetch(base_url + getklasemen, API_TOKEN)
.then(status)
.then(json)
.then((data) => { 
  // Objek/array JavaScript dari response.json() masuk lewat data.
  let winner =  data.standings[0];
  let klasemenHTML = "";
      winner.table.forEach((hasil) => {
        klasemenHTML += `            
            <tr>
              <td class="center-align">${hasil.position}</td>              
              <td class="klasemen">${hasil.team.name}
                <p>
                  <img class="responsive-img hide-on-small-only" style="width:40px; height:40px;" src="${hasil.team.crestUrl}" alt="club image" />
                </p>
              </td>            
              <td class="center-align">${hasil.won}</td>
              <td class="center-align">${hasil.draw}</td>
              <td class="center-align">${hasil.lost}</td>
              <td class="center-align">${hasil.points}</td>        
            </tr> 
          `;
  });

  document.getElementById("klasemens").innerHTML = klasemenHTML;
    
  })
  .catch(error);
}


// 3. kode get data player goal
let getgoal ="competitions/2014/scorers/";
function getAllGoal() {
  if ('caches' in window) {
      caches.match(base_url + getgoal, API_TOKEN).then((response) => {
        if (response) {
          response.json().then((data) => {
            let goalHTML = "";
            data.scorers.forEach((score) => {     
                  goalHTML += `                      
                    <tr>
                      <td>${score.player.name}</td> 
                      <td class="hide-on-small-only">${score.team.name}</td>                     
                      <td class="hide-on-small-only">${score.player.position}</td>  
                      <td class="hide-on-small-only">${score.player.nationality}</td>   
                      <td class="center-align">${score.numberOfGoals}</td>   
                      <td class="center-align"><a href="./article2.html?id=${score.player.id}" target="_blank" rel="noopener">Player Detail</a></td>               
                    </tr>                          
                  `;      
          });
        
          document.getElementById("goals").innerHTML = goalHTML;

      })
    }
  })
}

fetch(base_url + getgoal, API_TOKEN)
.then(status)
.then(json)
.then((data) => {
  // Objek/array JavaScript dari response.json() masuk lewat data.
            let goalHTML = "";
            data.scorers.forEach((score) => {       
                  goalHTML += `                      
                    <tr>
                      <td>${score.player.name}</td> 
                      <td class="hide-on-small-only">${score.team.name}</td>                     
                      <td class="hide-on-small-only">${score.player.position}</td>  
                      <td class="hide-on-small-only">${score.player.nationality}</td>   
                      <td class="center-align">${score.numberOfGoals}</td>
                      <td class="center-align"><a href="./article2.html?id=${score.player.id}" target="_blank" rel="noopener">Player Detail</a></td>                  
                    </tr>                          
                  `;         
  });

  document.getElementById("goals").innerHTML = goalHTML;
    
  })
  .catch(error);
}

// 4. kode get data detail klub By. ID
function getAllTeamsById() {
  return new Promise((resolve, reject) => {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam, API_TOKEN).then((response) => {
        if (response) {
          response.json().then((data) => {          
            let allteambyidHTML = `         
            <div class="row">
                <div class="col s12 m5">
                  <div class="card" style="margin-top:50px;"> 
                    <div class="card-image">                         
                      <img class="responsive-img" style="margin-top:20px;" src="${data.crestUrl}" alt="club image" />
                    </div>                      
                    <div class="card-content green lighten-3" style="margin-top:15px;">                         
                      <span class="card-title truncate center-align" style="font-weight:bold; font-size:30px;">${data.name}</span>
                    </div>
                  </div>
                </div>

                <div class="col s12 m7">
                    <div class="divider"></div>
                        <div class="section card-panel  lime lighten-3">
                            <h5>Short Name</h5>
                            <p>${data.shortName}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Address</h5>
                            <p>${data.address}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Phone</h5>
                            <p>${data.phone}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>E-Mail</h5>
                            <p>${data.email}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Founded</h5>
                            <p>${data.founded}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Club Colors</h5>
                            <p>${data.clubColors}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Venue</h5>
                            <p>${data.venue}}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Website</h5>
                            <p><a href="${data.website}" target="_blank" rel="noopener">${data.website}</a></p>
                        </div>
                </div>  
            </div>          
            `;

            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = allteambyidHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "teams/" + idParam, API_TOKEN)
      .then(status)
      .then(json)
      .then((data) => {
        // Objek JavaScript dari response.json() masuk lewat variabel data.     
        let allteambyidHTML = ` 
        <div class="row">
                <div class="col s12 m5">
                  <div class="card" style="margin-top:50px;"> 
                    <div class="card-image">                         
                      <img class="responsive-img" style="margin-top:20px;" src="${data.crestUrl}" alt="club image" />
                    </div>                      
                    <div class="card-content green lighten-3" style="margin-top:15px;">                         
                      <span class="card-title truncate center-align" style="font-weight:bold; font-size:30px;">${data.name}</span>
                    </div>
                  </div>
                </div>

                <div class="col s12 m7">
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Short Name</h5>
                            <p>${data.shortName}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Address</h5>
                            <p>${data.address}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Phone</h5>
                            <p>${data.phone}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>E-Mail</h5>
                            <p>${data.email}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Founded</h5>
                            <p>${data.founded}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Club Colors</h5>
                            <p>${data.clubColors}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Venue</h5>
                            <p>${data.venue}}</p>
                        </div>
                    <div class="divider"></div>
                        <div class="section card-panel lime lighten-3">
                            <h5>Website</h5>
                            <p><a href="${data.website}" target="_blank" rel="noopener">${data.website}</a></p>
                        </div>
                </div>  
            </div>                     
        `;

        // Sisipkan komponen card ke dalam elemen dengan id #content        
        document.getElementById("body-content").innerHTML = allteambyidHTML;

        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}



// 5. kode get data detail player score By. ID
function getPlayerById() {
  return new Promise((resolve, reject) => {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "players/" + idParam, API_TOKEN).then((response) => {
        if (response) {
          response.json().then((data) => {           
            let playerbyidHTML = `
            <div class="row">
            <div class="col s12">
              <div class="card">
                <div class="card-content blue-text">
                  <span class="card-title"></span>
                  <span class="card-title truncate" style="font-weight:bold; font-size:30px;">${data.name}</span> 
                </div>
                <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>First Name</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.name}</li>               
                </ul>
                <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>Last Name</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.lastName}</li>               
                </ul>
                <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>Date Of Birth</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.dateOfBirth}</li>               
              </ul>
              <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>Country Of Birth</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.countryOfBirth}</li>               
              </ul>
              <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>Nationality</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.nationality}</li>               
              </ul>
              <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>Position</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.position}</li>               
              </ul>
              <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>Shirt Number</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.shirtNumber}</li>               
              </ul>
              </div>               
            </div>
           </div>
            `;

            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = playerbyidHTML;

            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }

    fetch(base_url + "players/" + idParam, API_TOKEN)
      .then(status)
      .then(json)
      .then((data) => {  
        // Objek JavaScript dari response.json() masuk lewat variabel data.     
        let playerbyidHTML = `
        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-content blue-text">
                  <span class="card-title"></span>
                  <span class="card-title truncate" style="font-weight:bold; font-size:30px;">${data.name}</span> 
              </div>
              <ul class="collection card-content  with-header">
                  <li class="collection-header blue-text"><h4>First Name</h4></li>
                  <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.name}</li>  
              </ul>
              <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>Last Name</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.lastName}</li>               
              </ul>
              <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>Date Of Birth</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.dateOfBirth}</li>               
              </ul>
              <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>Country Of Birth</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.countryOfBirth}</li>               
              </ul>
              <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>Nationality</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.nationality}</li>               
              </ul>
              <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>Position</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.position}</li>               
              </ul>
              <ul class="collection card-content with-header">
                    <li class="collection-header blue-text"><h4>Shirt Number</h4></li>
                    <li class="collection-item" style="font-weight:bold; font-size:30px;">${data.shirtNumber}</li>               
              </ul>
            </div>               
          </div>
         </div>
          `;

        // Sisipkan komponen card ke dalam elemen dengan id #content        
        document.getElementById("body-content").innerHTML = playerbyidHTML;

        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

// Kode menyimpan artikel
// 6. menyimpan artikel
function getSavedArticles() {
  getAll().then((data) => {
    console.log(data);
    let teamHTML = `<div class="row" style="margin-bottom:50px;">
                        <div class="card-panel teal darken-3" style="height: auto">
                            <h4 class="center-align" style="margin-top:0; color: white;">Tim Favorit</h4>          
                        </div>  
                    </div> 
                  `;
                       

    data.forEach((team) => {                
      teamHTML += `        
            <div class="row grey lighten-1">
                <div class="col s12 m5">
                  <div class="card cardsave" style="margin-top:50px;"> 
                    <a href="./article.html?id=${team.id}&saved=true">
                    <div class="card-image waves-effect waves-block waves-light">                         
                      <img class="responsive-img" style="margin-top:20px;" src="${team.crestUrl}" alt="club image" />
                    </div>                      
                    <div class="card-content green lighten-3" style="margin-top:15px;">                         
                      <span class="card-title truncate center-align" style="font-weight:bold; font-size:30px;">${team.name}</span>
                    </div>
                  </div>
                </div>

                <div class="col s12 m7">                    
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>Short Name</h5>
                            <p>${team.shortName}</p>
                        </div>
                        <div class="divider"></div>                 
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>Address</h5>
                            <p>${team.address}</p>
                        </div> 
                        <div class="divider"></div>                
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>Phone</h5>
                            <p>${team.phone}</p>
                        </div> 
                        <div class="divider"></div>                
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>E-Mail</h5>
                            <p>${team.email}</p>
                        </div> 
                        <div class="divider"></div>                
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>Founded</h5>
                            <p>${team.founded}</p>
                        </div>
                        <div class="divider"></div>                 
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>Club Colors</h5>
                            <p>${team.clubColors}</p>
                        </div>
                        <div class="divider"></div>                 
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>Venue</h5>
                            <p>${team.venue}}</p>
                        </div>
                        <div class="divider"></div>                 
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>Website</h5>
                            <p><a href="${team.website}" target="_blank" rel="noopener">${team.website}</a></p>
                        </div>
                </div>                            
            </div>
            <br>                      
                `;
    });

    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}

// 7. Menyimpan artikel By.ID
function getSavedArticleById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  
  getById(parseInt(idParam)).then((team) => {
    console.log(team)
      let teambyidHTML = '';
      teambyidHTML = `
                <div class="row grey lighten-1">
                <div class="col s12 m5">
                  <div class="card" style="margin-top:50px;"> 
                    <a href="./article.html?id=${team.id}&saved=true">
                    <div class="card-image waves-effect waves-block waves-light">                         
                      <img class="responsive-img" style="margin-top:20px;" src="${team.crestUrl}" alt="club image" />
                    </div>                      
                    <div class="card-content green lighten-3" style="margin-top:15px;">                         
                      <span class="card-title truncate center-align" style="font-weight:bold; font-size:30px;">${team.name}</span>
                    </div>
                  </div>
                </div>

                <div class="col s12 m7">                    
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>Short Name</h5>
                            <p>${team.shortName}</p>
                        </div> 
                        <div class="divider"></div>                
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>Address</h5>
                            <p>${team.address}</p>
                        </div> 
                        <div class="divider"></div>                
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>Phone</h5>
                            <p>${team.phone}</p>
                        </div> 
                        <div class="divider"></div>                
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>E-Mail</h5>
                            <p>${team.email}</p>
                        </div>
                        <div class="divider"></div>                 
                        <div class="section card-panel lime lighten-3 cardhome">
                            <h5>Founded</h5>
                            <p>${team.founded}</p>
                        </div> 
                        <div class="divider"></div>                
                        <div class="section card-panel lime lighten-3">
                            <h5>Club Colors</h5>
                            <p>${team.clubColors}</p>
                        </div>
                        <div class="divider"></div>                 
                        <div class="section card-panel lime lighten-3">
                            <h5>Venue</h5>
                            <p>${team.venue}}</p>
                        </div> 
                        <div class="divider"></div>                
                        <div class="section card-panel lime lighten-3">
                            <h5>Website</h5>
                            <p><a href="${team.website}" target="_blank" rel="noopener">${team.website}</a></p>
                        </div>                        
                </div>                            
            </div>
            <br>       
        `;

    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teambyidHTML;

  });
}