
function Footer() {
    const footerStyle = {
        backgroundColor: "green",
        fontSize: "20px",
        color: "white",
        borderTop: "1px solid black",
        textAlign: "center",
        padding: "20px",
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%"
    };
    return (
        <div style={footerStyle}>© MisFits {new Date().getFullYear()}</div>
    );
}

export default Footer;