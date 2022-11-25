function sortOnDistance(a, b){
    if(a.cur_dis < b.cur_dis) return -1;
    if(a.cur_dis > b.cur_dis) return 1;
    return 0;
}

function sortOnDuration(a, b){
    if(a.cur_dur < b.cur_dur) return -1;
    if(a.cur_dur > b.cur_dur) return 1;
    return 0;
}

// a list of objects with 'distance' as property
function geneCorLi(distLi){
    let cur_li = [];
    for(let i=0; i < distLi.length; i++){
        cur_li.push({lat: parseFloat(distLi[i].latitude), lng: parseFloat(distLi[i].longitude)});
    }
    return cur_li;
}

// postlocaiton
function postLocation(lat, long, url){
  var cur_loc = {
    latitude: lat,
    longitude: long
  }
  return  $.ajax({
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(cur_loc),
      url: url});
}

// post username to query user info
// @ret: body with User table record
function postUsername(uname, password, url){
    let UnamePassword = {
        username: uname,
        password: password
    }
    return  $.ajax({
        type: "GET",
        contentType: "application/json",
        data: JSON.stringify(UnamePassword),
        url: url
    });
}


// postloc&dist
function postVacc(lat, long, dist, url){
    var request = {
      latitude: lat,
      longitude: long,
      distance: dist
    }
    return  $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(request),
        url: url,});
};

// return the header for querying real-time distance
function constructMatrixHeader(dest_li, selectedMode){
    const origin1 = { lat: origin_lat, lng: origin_lon};
    const request = {
        origins: [origin1],
        destinations: dest_li,
        travelMode: google.maps.TravelMode[selectedMode],
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
    };
    return request;
}

// highlight a specific substring in the mainstring
// @ret: a html string could be embeded in the html
function highlightSubstring(super_string, sub_string){
    // let ret = ""
    let sub_start_idx = super_string.indexOf(sub_string);
    // ret += super_string
    let sub_before = super_string.substring(0, sub_start_idx);
    let sub_after = super_string.substring(sub_start_idx+sub_string.length, super_string.length);
    return `${sub_before}<span style='color:orange'>${sub_string}</span>${sub_after}`;
}
