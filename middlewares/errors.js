const notFound = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // haya5od el el error ydeh ll middle ware eli b3do yhandlo
    };

    //error handler middle ware 3shan feha 4 arguments
    const errorHandler = (err,req,res,next)=>{
        const statusCode = res.statusCode ===200 ? 500 :res.statusCode;
        res.status(statusCode).json({message: err.message});
      };

      module.exports={
        notFound,
        errorHandler
      }