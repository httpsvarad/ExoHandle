const ip = require("ip");

// Define allowed subnet (Example: 202.134.146.0/24 allows all IPs in 202.134.146.x)
const allowedSubnet = "58.146.96.0/24";

// Firewall Controller Function

exports.firewallCheck = (req, res) => {

    try {
        
        const clientIP = req.headers["x-client-ip"]  // Get IP from headers or detected IP
        
        console.log("Client IP:", clientIP); // Debugging
    
        // Check if the client IP is within the allowed subnet
        if (!ip.cidrSubnet(allowedSubnet).contains(clientIP)) {
            return res.status(403).json({ status: "Unauthorized IP address" });
        }
    
        return res.status(200).json({ status: "Authorized IP address" }); // Allow access if IP is in the subnet
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: "ERROR", error: error }); // Allow access if IP is in the subnet 
    }
};
