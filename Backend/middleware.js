const validateReport = (req, res, next) => {
    const { studentId, universityId, itemName, description, lastSeen, contactNumber } = req.body;
    console.log(req.body);
  
    // Check if required fields are present
    if (!studentId  || !itemName || !description || !lastSeen || !contactNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    else{
      next();
    }
 
    
  };
  
  export default validateReport;