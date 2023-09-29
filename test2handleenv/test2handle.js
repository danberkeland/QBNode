/* Just testing VS Code */

const axios = require("axios");


const handle = async (event, context) => {
  
  let promise = await axios({
    method: "get",
    url: "https://quickbooks.api.intuit.com/v3/company/480063645/query?query=select%20%2A%20from%20customer%20where%20DisplayName%20%3D%20%27Novo%27%20startposition%201%20maxresults%201000&minorversion=4&format=json",
    responseType: "application/json",
    headers: {
      Authorization:
        "Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..Ha4qzvIVc1bRbxRjvaxbuQ.TPT_ABTnsG6QdV37P_AQzS6e4jeuszLa9pcCaS7-754v-WbgZFDP0WJOLQMLA1kH6gk8qYkgXabMHF1QGi6YBa1bsBwcpEK3NF8SXqQ89GDpLxMdz5vFcDCDzw3NICdCy57V1fUtg1InYg16cp6XyHuTa_p7i1jka3AGi1RV1agK-gBejs4ZHYPu9Nr0zbWVs3AxBpIP6BVHDLIuFB5sPFzdjO6bn8JnZm0QHwqTYu2j2VrqRU87voHig-IQGg2ZqGbSzV0Q9wJ3XQqPwY64McKe6Ocljqlia8aeE9py_VlF7Bn0H_O3TxOvRwLjKlSrdaIro7isoRB_R5CNVwiiASonuuea0vGKMtP1fRvma2npsWFXZDoThU7aFNwKQHMhPCSL0WDjAFUKTfBPDGistv41yXWsUrJjXJXUH9kxdnEiw58lG41d_MkOEENDXIcYsRSCzjAmYNB6HDXS33lC7lvqPG44YhLGWAsJUAltoAKf3EWJTA4RqBrqkD5L5SHJ-xUY8MxuZyIvi-vp6ljdo2MI6JzraSzL-XHoUkrSnfU4W0nOkfLUSXJPZDo5xkEOgLyzcms9mwLUBQ4v0uYP-vtt6IyDqUpPJ4-yMUIysAlTWMocbj8EAL9J8rCWoeIXzaH5fVk1h4aveK8hrd80jzXhLzu8qhEWCAN0a1W4qJLSVWvE36uneo2PFuUj8hzmMAN_ukaSebZFa98UFs1KTNfFGEYnKC0EYypmyamf0bI.uU3p9g8OPyp6LMp7UXG7VA",
    },
  })
  
  return promise
  
  
  
};

handle().then(data => {
  console.log(data.data.QueryResponse.Customer[0])
})

