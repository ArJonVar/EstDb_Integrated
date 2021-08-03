import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

const NewVendorComponents = ({vendor}) => {
    const intakeData = useSelector((state) => state.formLogic.intakeData.getReceived)
    const vendors= Object.values(intakeData[0][Object.keys(intakeData[0])[4]])
    const dispatch = useDispatch()
    // const [newSubRVendor, setNewSubRVendor] = useState('')
    // const [newSubRVendorUrl, setNewSubRVendorUrl] = useState('')


    return ( 
        <span>
        {(vendors.indexOf(vendor) === -1) && 
            <span>
            <div className="conditionalVendors">
              <h2>New Subcontractor / Vendor</h2>
              <p>provide the properly spelled name of the vendor or subcontract</p>
              <input placeholder="Sub / Vendor Name" required onBlur={(e)=> dispatch({ type: 'formMemory/intakeDataNewSubRVen', payload: (e.target.value)})}></input>
            </div>

            <div className="conditionalVendors">
                <h2>New Subcontractor / Vendor URL</h2>
                <p>provide the URL website Address of the new Subcontractor or Vendor</p>
                <input placeholder="https:/www.subcontractor.com" required onBlur={(e)=> dispatch({ type: 'formMemory/intakeDataHandleNewSubRVenUrl', payload: (e.target.value)})}></input>
            </div>
            </span>
        }
        </span>
     );
}
 
export default NewVendorComponents;
