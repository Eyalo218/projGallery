console.log('Starting up');

$(document).ready(initPage());

function initPage() {
    var projects = getProjects()
    var strHTML = '';
    renderPortfolio(projects);
    //need to find how to do it automaticly..without shellJS
   

}

function renderPortfolio(projects){
    var strHTML = '';
    projects.forEach(function(proj){
        strHTML+= generatePortfolio(proj);
    });
    $('.portfolio').html(strHTML);
}

function renderModal(id){
    var proj = getProjById(id);
    var strHTML = generateModal(proj);
    $('.modal-container').html(strHTML);
}



function generateModal(proj){
    console.log(proj);
    var time = getTime(proj.publishedAt)

    return `<div class="portfolio-modal modal fade" id="portfolioModal${proj.id}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${proj.name}</h2>
                <p class="item-intro text-muted">${proj.title}.</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}.jpg" alt="">
                <p>${proj.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${time}</li>
                </ul>
                 
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
                    Close Project
                </button>
                <a target="_blank" href="${proj.url}index.html">
                <button class="btn btn-primary view-project" type="button">
                    Enter Project &#128269
                </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
}

function generatePortfolio(proj) {
    return `<div class="col-md-4 col-sm-6 portfolio-item" onclick="renderModal('${proj.id}')">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${proj.id}">
      <div class="portfolio-hover">
        <div class="portfolio-hover-content">
          <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" alt="">
    </a>
    <div class="portfolio-caption">
      <h4>${proj.name}</h4>
      <p class="text-muted">${proj.title}</p>
    </div>
  </div>`
}