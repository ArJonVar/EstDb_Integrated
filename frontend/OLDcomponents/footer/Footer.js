const Footer = () => {
    
    const handleSubmit= () => {
        console.log('submitted!')
    }
    
    return (
        <div className="macroFooter">
            <div className="footerSpacer"></div>
            <div className="footer" id="board">
                <form>
                    <br></br>
                    <input type="submit"  onSubmit={() => handleSubmit}></input>
                </form>
            </div>
        </div>
      );
}
 
export default Footer;