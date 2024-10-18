document.getElementById('domain-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const domain = document.getElementById('domain-input').value.trim();
    if (!domain) {
      alert('Please enter a domain name.');
      return;
    }
  
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';
  
    try {
      // **Replace the placeholders below with your actual GoDaddy API credentials**
      const apiKey = 'h1eM8US6KHTE_EHs5Xd8PDfJzDgrGMDfFmV';
      const apiSecret = 'KPnVr29L8wnWYLcR7s6FFo';
  
      // Construct the API URL
      const apiUrl = `https://api.godaddy.com/v1/domains/${encodeURIComponent(domain)}`;
  
      // Make the API request
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `sso-key ${apiKey}:${apiSecret}`,
          'Accept': 'application/json'
        }
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Domain not found.');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error: ${response.status} ${response.statusText}`);
        }
      }
  
      const data = await response.json();
      displayDomainInfo(data);
    } catch (error) {
      resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
  });
  
  function displayDomainInfo(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
      <h2>Domain Information</h2>
      <p><strong>Domain:</strong> ${data.domain}</p>
      <p><strong>Status:</strong> ${data.status.join(', ')}</p>
      <p><strong>Expiration Date:</strong> ${new Date(data.expires).toLocaleDateString()}</p>
      <p><strong>Nameservers:</strong></p>
      <ul>
        ${data.nameServers.map(ns => `<li>${ns}</li>`).join('')}
      </ul>
      <p><strong>Registrant:</strong> ${data.registrant ? data.registrant.name : 'N/A'}</p>
    `;
  }
  