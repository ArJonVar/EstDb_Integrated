import React from 'react';

const Fileuploads= () => {
    return(
    <div>
        <div className = "uploadButton">
            <div>
                <label htmlFor="Vendor Agreement Upload:">Vendor Agreement Upload:     </label>
            </div>
            <div>
                <input type="file" id="Vendor Agreement Upload:" name="filename"></input>
            </div>
        </div>
        <br></br>
        <div> 
            <div> 
                <label htmlFor="Bid Document Upload:">Bid Document Upload:     </label>
            </div>
            <div>  
                <input type="file" id="Bid Document Upload:" name="filename"></input>
            </div>
        </div>
    </div>
    )
}

export default Fileuploads;
