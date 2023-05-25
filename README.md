# genai-search-app

![alt text](https://github.com/felipecastrillon/genai-search-app/blob/main/sample.png)

This UI demo uses GCP's Vertex Palm API and Enterprise Search API to generate results from an input field

## Assumptions
This demo assumes you have Vertex API enabled and an Enterprise Search instance set up

## Steps to Set Up
1) clone this repository in your local machine
2) [optional] replace Cymbal-logo.png file for your logo
3) navigate to script.js and replace the following variables: studio_project_id (Project ID to call the Vertex API), es_project_num (Enterprise Search project number), es_endpoint_name (Enterprise Search endpoint name), token (your authorization token, you can use `gcloud auth print-access-token` to get it
4) Double click on index.html and your UI should be up and running. 
