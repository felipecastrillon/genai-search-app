var search = document.getElementById("search-input");
var palm_results = document.getElementById("palm_results");
var es_results = document.getElementById("es_results");
var studio_project_id = "";
var es_project_num = "";
var es_endpoint_name = "";
var token = "";

function get_search(e){

if (e.keyCode === 13) {
  const searchTerm = document.getElementById("search-input").value; 
  var endpoint = "https://us-central1-aiplatform.googleapis.com/v1/projects/"+studio_project_id+"/locations/us-central1/publishers/google/models/text-bison@001:predict";
  var request = {
    "instances": [
    {
      "content": searchTerm
    }
    ],
  "parameters": {
    "temperature": 0,
    "maxOutputTokens": 256,
    "topP": 0.8,
    "topK": 40
   }
 };
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": "Bearer "+token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  })
    .then(response => response.json())
    .then(data => {
      palm_results.innerHTML = data.predictions[0].content;
    });

  var endpoint = "https://discoveryengine.googleapis.com/v1alpha/projects/"+es_project_num+"/locations/global/collections/default_collection/dataStores/"+es_endpoint_name+"/servingConfigs/default_search:search";
  var request = { "query": searchTerm, "page_size": "5", "offset": 0 };
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  })
    .then(response => response.json())
    .then(data => {
          let string = data.summary.summaryText+ "<br><br><br>"; 
          data.results.forEach(function(item, index) { 
               		string += "<br>" +"["+(index+1)+"]"+item.document.derivedStructData.link + "<br><br>snippets:<br>"
			item.document.derivedStructData.snippets.forEach(s => string += "<br>\"" + s.snippet + "\"<br>")  
		});
          es_results.innerHTML = string
    });
}


}
