import React, { useEffect, useState } from 'react';
import UAParser from 'ua-parser-js';
import { deviceDetect, isMobile, osName, osVersion } from 'react-device-detect';
import '../Stylesheet/UserAgentLogger.css'; // Make sure to import the CSS file

const UserAgentLogger = () => {
  const [userAgentInfo, setUserAgentInfo] = useState({
    device: '',
    model: '',
    os: '',
    osVersion: '',
    browser: '',
    ip: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // Get user agent details using ua-parser-js
      const parser = new UAParser();
      const uaResult = parser.getResult();

      const browser = uaResult.browser.name || 'Unknown Browser';

      // Get device details using react-device-detect
      const deviceDetails = deviceDetect();
      const device = deviceDetails.device || 'Unknown Device';
      const model = isMobile ? deviceDetails.model : 'Not a Mobile Device';
      const os = osName || 'Unknown OS';
      const osVer = osVersion || 'Unknown Version';

      // Get IP address
      let ip = 'Unknown IP';
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        ip = data.ip;
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }

      // Set state with user agent details and IP address
      setUserAgentInfo({
        device,
        model,
        os,
        osVersion: osVer,
        browser,
        ip
      });
      setLoading(false);
    //   setLoading(true);
    };

    fetchUserData();
  }, []);

  return (
    <div className='container'>
    <div className="user-agent-logger">
      <h2>User Agent Details:</h2>
      {loading ? (
        <div>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
      ) : (
        <div>
            <div className='box-div'>
           <p>Device:</p> <h2>{userAgentInfo.device}</h2>
           </div>
           <div className='box-div'>
          <p>Model:</p><h2> {userAgentInfo.model}</h2>
          </div>

          <div className='box-div'>
          <p>Operating System:</p><h2>{userAgentInfo.os}</h2>
          </div>

          <div className='box-div'>
          <p>OS Version:</p><h2>{userAgentInfo.osVersion}</h2>
          </div>

          <div className='box-div'>
          <p>Browser:</p><h2>{userAgentInfo.browser}</h2>
          </div>

          <div className='box-div'>
          <p>IP Address: </p><h2>{userAgentInfo.ip}</h2>
          </div>
         
        
         
        </div>
      )}
    </div>
    </div>
  );
};

export default UserAgentLogger;
