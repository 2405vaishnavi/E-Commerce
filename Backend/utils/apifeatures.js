class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex:this.queryStr.keyword, $options : "i" , // small i refers to case insensitive,
            }
        } :
        {};        
        this.query = this.query.find({...keyword});
        return this;
    }

    // all object pass through reference in js
    filter(){
        const queryCopy = {...this.queryStr};

        // Removing some fields for category
        const removeField = ["keyword","page","limit"];

        removeField.forEach(key => delete queryCopy[key]);

        // filter for price and rating
    
        // convert to string
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);

        // convert to object (JSON.parse())
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1 ; 
        const skip = resultPerPage * (currentPage-1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;