import React, { useState } from 'react';
import { motion } from 'framer-motion';

function BlockchainVerification({ user }) {
  const [recentClaims] = useState([
    {
      claimId: 'CLM-2026-03-19-000567',
      amount: 600,
      date: '19 Mar 2026',
      blockchainHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
      verified: true,
      network: 'Polygon'
    }
  ]);

  const [showDetails, setShowDetails] = useState(false);

  const shortenHash = (hash) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Hash copied to clipboard!');
  };

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>🔗 Blockchain Verification</h2>
        <span className="status-badge badge-success">
          ✓ Verified
        </span>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
          <span style={{ fontSize: '36px' }}>🛡️</span>
          <div>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>Tamper-Proof Claims</p>
            <p style={{ fontSize: '20px', fontWeight: 600, margin: '5px 0 0 0' }}>
              Secured on Blockchain
            </p>
          </div>
        </div>
        <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
          All your claims are permanently recorded on the Polygon blockchain for transparency and security.
        </p>
      </div>

      {recentClaims.map((claim, index) => (
        <motion.div 
          key={index}
          style={{ 
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '15px'
          }}
          whileHover={{ borderColor: '#667eea' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 5px 0' }}>Claim ID</p>
              <p style={{ fontWeight: 600, margin: 0 }}>{claim.claimId}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '12px', color: '#666', margin: '0 0 5px 0' }}>Amount</p>
              <p style={{ fontWeight: 600, color: '#11998e', margin: 0 }}>₹{claim.amount}</p>
            </div>
          </div>

          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Blockchain Hash</span>
              <span className="status-badge badge-success" style={{ fontSize: '12px' }}>
                {claim.network}
              </span>
            </div>
            <div style={{ 
              background: 'white',
              padding: '10px',
              borderRadius: '6px',
              fontFamily: 'monospace',
              fontSize: '12px',
              wordBreak: 'break-all',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>{showDetails ? claim.blockchainHash : shortenHash(claim.blockchainHash)}</span>
              <motion.button
                onClick={() => copyToClipboard(claim.blockchainHash)}
                style={{ 
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  marginLeft: '10px'
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                title="Copy hash"
              >
                📋
              </motion.button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <motion.button
              className="btn"
              style={{ flex: 1, padding: '10px', fontSize: '14px' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide Details' : 'View Details'}
            </motion.button>
            <motion.button
              className="btn-secondary"
              style={{ flex: 1, padding: '10px', fontSize: '14px' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(`https://polygonscan.com/tx/${claim.blockchainHash}`, '_blank')}
            >
              View on Explorer
            </motion.button>
          </div>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e0e0e0' }}
            >
              <h4 style={{ marginBottom: '10px' }}>Verification Details</h4>
              <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                <p><strong>Date:</strong> {claim.date}</p>
                <p><strong>Network:</strong> {claim.network} (Low gas fees)</p>
                <p><strong>Status:</strong> <span style={{ color: '#11998e' }}>✓ Verified on blockchain</span></p>
                <p><strong>Confirmations:</strong> 1,247 blocks</p>
                <p><strong>Immutable:</strong> Cannot be altered or deleted</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}

      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px' }}>
        <h4 style={{ marginBottom: '15px' }}>🔐 Why Blockchain?</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
          <li><strong>Tamper-Proof:</strong> Claims cannot be altered once recorded</li>
          <li><strong>Transparent:</strong> Anyone can verify your claims independently</li>
          <li><strong>Regulatory Ready:</strong> Meets compliance requirements</li>
          <li><strong>Dispute Resolution:</strong> Immutable proof for any conflicts</li>
          <li><strong>Trust:</strong> No central authority can manipulate records</li>
        </ul>
      </div>
    </motion.div>
  );
}

export default BlockchainVerification;
