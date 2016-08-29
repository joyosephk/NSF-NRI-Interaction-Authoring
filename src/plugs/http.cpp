#include <stdio.h>
#include <curl/curl.h>

// find more documentation at https://curl.haxx.se/libcurl/c/


void make_post(char  data[]){
	//curl represents a request
	CURL *curl;
	//represents a response
	CURLcode res;
	curl = curl_easy_init();
	if(curl){
		//set the url to post to
		curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:5000");
		//set the postfield data, should be a string with format variable_1_name=variable_1_value&variable_2_name=variable_2_value
		curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);
		res = curl_easy_perform(curl);
		 /* Check for errors */ 
    if(res != CURLE_OK)
      fprintf(stderr, "curl_easy_perform() failed: %s\n",
              curl_easy_strerror(res));
 
    /* always cleanup */ 
    curl_easy_cleanup(curl);
	}
}

int main(){
	curl_global_init(CURL_GLOBAL_ALL);
	char variable_string[] = "current_therblig=grasping";
	make_post(variable_string);
	curl_global_cleanup();
	return 0;
}

