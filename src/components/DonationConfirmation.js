/**
 * DonationConfirmation Component
 * 
 * Displays donation confirmation with receipt information, thank you message,
 * and engagement options including social sharing and additional ways to help.
 * 
 * @module components/DonationConfirmation
 */

import { icons } from '../utils/icons.js';

/**
 * Creates and renders the donation confirmation component
 * 
 * @param {Object} donationData - Donation transaction data
 * @param {string} donationData.transactionId - Unique transaction identifier
 * @param {number} donationData.amount - Donation amount
 * @param {string} donationData.currency - Currency code (e.g., 'USD')
 * @param {string} donationData.donationType - 'one-time' or 'recurring'
 * @param {string} donationData.paymentMethod - Payment method used
 * @param {string} donationData.donorName - Donor's name
 * @param {string} donationData.donorEmail - Donor's email
 * @param {string} donationData.date - Transaction date
 * @param {string} [donationData.recurringFrequency] - Frequency for recurring donations
 * @returns {HTMLElement} Confirmation component element
 */
export function createDonationConfirmation(donationData) {
  if (!donationData || typeof donationData !== 'object') {
    console.error('[DonationConfirmation] Invalid donation data provided');
    throw new Error('Valid donation data is required');
  }

  const {
    transactionId,
    amount,
    currency = 'USD',
    donationType,
    paymentMethod,
    donorName,
    donorEmail,
    date,
    recurringFrequency,
  } = donationData;

  // Validate required fields
  if (!transactionId || !amount || !donationType || !paymentMethod || !donorEmail) {
    console.error('[DonationConfirmation] Missing required donation data fields', {
      transactionId,
      amount,
      donationType,
      paymentMethod,
      donorEmail,
    });
    throw new Error('Missing required donation data fields');
  }

  const container = document.createElement('div');
  container.className = 'min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8';
  container.setAttribute('role', 'main');
  container.setAttribute('aria-labelledby', 'confirmation-heading');

  const formattedAmount = formatCurrency(amount, currency);
  const formattedDate = formatDate(date);
  const shareUrl = encodeURIComponent(window.location.origin);
  const shareText = encodeURIComponent(
    `I just donated ${formattedAmount} to Makoko Community Kids NGO! Join me in supporting education and empowerment for children in Makoko.`
  );

  container.innerHTML = `
    <div class="max-w-3xl mx-auto">
      <!-- Success Icon and Header -->
      <div class="text-center mb-8 animate-fadeInDown">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <svg class="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 id="confirmation-heading" class="text-4xl font-bold text-gray-900 mb-4">
          Thank You for Your ${donationType === 'recurring' ? 'Recurring ' : ''}Donation!
        </h1>
        <p class="text-xl text-gray-600">
          Your generosity is making a real difference in the lives of children in Makoko.
        </p>
      </div>

      <!-- Receipt Card -->
      <div class="card bg-white p-8 mb-8 animate-fadeInUp">
        <div class="border-b border-gray-200 pb-6 mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Donation Receipt</h2>
          <p class="text-sm text-gray-600">
            A confirmation email has been sent to <span class="font-semibold">${escapeHtml(donorEmail)}</span>
          </p>
        </div>

        <div class="space-y-4">
          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="text-gray-600 font-medium">Transaction ID</span>
            <span class="text-gray-900 font-mono text-sm">${escapeHtml(transactionId)}</span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="text-gray-600 font-medium">Donor Name</span>
            <span class="text-gray-900">${escapeHtml(donorName || 'Anonymous')}</span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="text-gray-600 font-medium">Amount</span>
            <span class="text-2xl font-bold text-primary-600">${formattedAmount}</span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="text-gray-600 font-medium">Donation Type</span>
            <span class="text-gray-900 capitalize">
              ${donationType === 'recurring' ? `${escapeHtml(recurringFrequency || 'Monthly')} Recurring` : 'One-Time'}
            </span>
          </div>

          <div class="flex justify-between items-center py-3 border-b border-gray-100">
            <span class="text-gray-600 font-medium">Payment Method</span>
            <span class="text-gray-900 capitalize">${escapeHtml(paymentMethod)}</span>
          </div>

          <div class="flex justify-between items-center py-3">
            <span class="text-gray-600 font-medium">Date</span>
            <span class="text-gray-900">${formattedDate}</span>
          </div>
        </div>

        ${donationType === 'recurring' ? `
          <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
              <div>
                <h3 class="text-sm font-semibold text-blue-900 mb-1">Recurring Donation Active</h3>
                <p class="text-sm text-blue-800">
                  Your ${escapeHtml(recurringFrequency || 'monthly')} donation of ${formattedAmount} will be automatically processed. 
                  You can manage or cancel your recurring donation at any time from your donor dashboard.
                </p>
              </div>
            </div>
          </div>
        ` : ''}

        <div class="mt-6 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-600 text-center">
            This donation is tax-deductible to the extent allowed by law. Tax ID: XX-XXXXXXX
          </p>
        </div>
      </div>

      <!-- Impact Message -->
      <div class="card bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-8 mb-8 animate-fadeInUp" style="animation-delay: 0.1s;">
        <h2 class="text-2xl font-bold mb-4">Your Impact</h2>
        <p class="text-lg mb-6 leading-relaxed">
          ${getImpactMessage(amount, donationType)}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div class="text-3xl font-bold mb-1">${icons.education}</div>
            <p class="text-sm">Education Support</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div class="text-3xl font-bold mb-1">${icons.health}</div>
            <p class="text-sm">Health & Nutrition</p>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div class="text-3xl font-bold mb-1">${icons.community}</div>
            <p class="text-sm">Community Development</p>
          </div>
        </div>
      </div>

      <!-- Share Section -->
      <div class="card bg-white p-8 mb-8 animate-fadeInUp" style="animation-delay: 0.2s;">
        <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">Spread the Word</h2>
        <p class="text-gray-600 text-center mb-6">
          Help us reach more supporters by sharing your donation on social media
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            class="btn-share inline-flex items-center gap-2 px-6 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl transition-all duration-200 hover:shadow-lg"
            data-platform="facebook"
            data-url="${shareUrl}"
            aria-label="Share on Facebook"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>

          <button
            type="button"
            class="btn-share inline-flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] hover:bg-[#1A91DA] text-white rounded-xl transition-all duration-200 hover:shadow-lg"
            data-platform="twitter"
            data-url="${shareUrl}"
            data-text="${shareText}"
            aria-label="Share on Twitter"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            Twitter
          </button>

          <button
            type="button"
            class="btn-share inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl transition-all duration-200 hover:shadow-lg"
            data-platform="linkedin"
            data-url="${shareUrl}"
            aria-label="Share on LinkedIn"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </button>

          <button
            type="button"
            class="btn-share inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl transition-all duration-200 hover:shadow-lg"
            data-platform="whatsapp"
            data-text="${shareText}"
            aria-label="Share on WhatsApp"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </button>
        </div>
      </div>

      <!-- Next Steps -->
      <div class="card bg-white p-8 mb-8 animate-fadeInUp" style="animation-delay: 0.3s;">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">More Ways to Help</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="#volunteer"
            class="group flex items-start p-6 bg-gray-50 rounded-xl hover:bg-primary-50 transition-all duration-200 hover:shadow-md"
          >
            <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                Volunteer Your Time
              </h3>
              <p class="text-gray-600 text-sm">
                Join our team and make a direct impact in the Makoko community
              </p>
            </div>
          </a>

          <a
            href="#programs"
            class="group flex items-start p-6 bg-gray-50 rounded-xl hover:bg-secondary-50 transition-all duration-200 hover:shadow-md"
          >
            <div class="flex-shrink-0 w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center group-hover:bg-secondary-200 transition-colors">
              <svg class="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-1 group-hover:text-secondary-600 transition-colors">
                Learn About Our Programs
              </h3>
              <p class="text-gray-600 text-sm">
                Discover how we're transforming lives through education and support
              </p>
            </div>
          </a>

          <a
            href="#newsletter"
            class="group flex items-start p-6 bg-gray-50 rounded-xl hover:bg-accent-50 transition-all duration-200 hover:shadow-md"
          >
            <div class="flex-shrink-0 w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center group-hover:bg-accent-200 transition-colors">
              <svg class="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-1 group-hover:text-accent-600 transition-colors">
                Subscribe to Updates
              </h3>
              <p class="text-gray-600 text-sm">
                Stay informed about our impact and upcoming events
              </p>
            </div>
          </a>

          <a
            href="#contact"
            class="group flex items-start p-6 bg-gray-50 rounded-xl hover:bg-primary-50 transition-all duration-200 hover:shadow-md"
          >
            <div class="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                Get in Touch
              </h3>
              <p class="text-gray-600 text-sm">
                Have questions? We'd love to hear from you
              </p>
            </div>
          </a>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style="animation-delay: 0.4s;">
        <a
          href="/"
          class="btn btn-primary text-lg px-8 py-4"
        >
          Return to Home
        </a>
        <button
          type="button"
          id="print-receipt-btn"
          class="btn btn-outline text-lg px-8 py-4"
          aria-label="Print receipt"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
          </svg>
          Print Receipt
        </button>
      </div>
    </div>
  `;

  // Attach event listeners
  attachEventListeners(container, donationData);

  return container;
}

/**
 * Attaches event listeners to confirmation component elements
 * 
 * @param {HTMLElement} container - Container element
 * @param {Object} donationData - Donation data for tracking
 */
function attachEventListeners(container, donationData) {
  // Social share buttons
  const shareButtons = container.querySelectorAll('.btn-share');
  shareButtons.forEach((button) => {
    button.addEventListener('click', handleSocialShare);
  });

  // Print receipt button
  const printButton = container.querySelector('#print-receipt-btn');
  if (printButton) {
    printButton.addEventListener('click', () => handlePrintReceipt(donationData));
  }

  console.log('[DonationConfirmation] Event listeners attached successfully');
}

/**
 * Handles social media sharing
 * 
 * @param {Event} event - Click event
 */
function handleSocialShare(event) {
  const button = event.currentTarget;
  const platform = button.getAttribute('data-platform');
  const url = button.getAttribute('data-url');
  const text = button.getAttribute('data-text');

  let shareUrl = '';

  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${text}%20${url}`;
      break;
    default:
      console.error('[DonationConfirmation] Unknown share platform:', platform);
      return;
  }

  // Open share window
  const width = 600;
  const height = 400;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open(
    shareUrl,
    'share',
    `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0`
  );

  console.log('[DonationConfirmation] Social share initiated:', platform);
}

/**
 * Handles receipt printing
 * 
 * @param {Object} donationData - Donation data to include in print
 */
function handlePrintReceipt(donationData) {
  try {
    // Create print-friendly version
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('[DonationConfirmation] Failed to open print window');
      alert('Please allow pop-ups to print your receipt');
      return;
    }

    const formattedAmount = formatCurrency(donationData.amount, donationData.currency);
    const formattedDate = formatDate(donationData.date);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Donation Receipt - ${donationData.transactionId}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 2px solid #0284c7;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #0284c7;
            margin: 0 0 10px 0;
          }
          .receipt-details {
            margin: 30px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .detail-label {
            font-weight: 600;
            color: #6b7280;
          }
          .detail-value {
            color: #111827;
          }
          .amount {
            font-size: 24px;
            font-weight: bold;
            color: #0284c7;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
          }
          @media print {
            body {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Makoko Community Kids NGO</h1>
          <p>Donation Receipt</p>
        </div>
        
        <div class="receipt-details">
          <div class="detail-row">
            <span class="detail-label">Transaction ID:</span>
            <span class="detail-value">${escapeHtml(donationData.transactionId)}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Donor Name:</span>
            <span class="detail-value">${escapeHtml(donationData.donorName || 'Anonymous')}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Email:</span>
            <span class="detail-value">${escapeHtml(donationData.donorEmail)}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Amount:</span>
            <span class="detail-value amount">${formattedAmount}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Donation Type:</span>
            <span class="detail-value">${donationData.donationType === 'recurring' ? `${escapeHtml(donationData.recurringFrequency || 'Monthly')} Recurring` : 'One-Time'}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Payment Method:</span>
            <span class="detail-value">${escapeHtml(donationData.paymentMethod)}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Date:</span>
            <span class="detail-value">${formattedDate}</span>
          </div>
        </div>
        
        <div class="footer">
          <p>This donation is tax-deductible to the extent allowed by law.</p>
          <p>Tax ID: XX-XXXXXXX</p>
          <p>Thank you for your generous support!</p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
    console.log('[DonationConfirmation] Print receipt generated successfully');
  } catch (error) {
    console.error('[DonationConfirmation] Error generating print receipt:', error);
    alert('Failed to generate print receipt. Please try again.');
  }
}

/**
 * Formats currency amount
 * 
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch (error) {
    console.error('[DonationConfirmation] Error formatting currency:', error);
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/**
 * Formats date string
 * 
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (error) {
    console.error('[DonationConfirmation] Error formatting date:', error);
    return dateString;
  }
}

/**
 * Generates personalized impact message based on donation amount
 * 
 * @param {number} amount - Donation amount
 * @param {string} donationType - Type of donation
 * @returns {string} Impact message
 */
function getImpactMessage(amount, donationType) {
  const isRecurring = donationType === 'recurring';
  const prefix = isRecurring ? 'Your monthly donation of' : 'Your donation of';

  if (amount >= 500) {
    return `${prefix} this amount can provide comprehensive educational support, including school supplies, uniforms, and tutoring for multiple children throughout the year. You're making a transformational impact!`;
  } else if (amount >= 250) {
    return `${prefix} this amount can sponsor a child's education for several months, including books, supplies, and nutritious meals. You're changing lives!`;
  } else if (amount >= 100) {
    return `${prefix} this amount can provide school supplies and meals for a child for an entire term. Your generosity is making education possible!`;
  } else if (amount >= 50) {
    return `${prefix} this amount can provide essential school supplies and nutritious meals for a child for several weeks. Thank you for your support!`;
  } else {
    return `${prefix} this amount contributes to our community programs and helps provide essential resources for children in need. Every contribution matters!`;
  }
}

/**
 * Escapes HTML to prevent XSS attacks
 * 
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  if (typeof text !== 'string') {
    return String(text);
  }

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (char) => map[char]);
}