# Smart Mandi 🛒

A multilingual marketplace web application designed to help local Indian vendors and buyers overcome language barriers and price opacity.

## Features

- **Multilingual Interface**: Support for English, Hindi, Tamil, Telugu, Bengali, Gujarati, Marathi, and Kannada
- **AI-Driven Price Discovery**: Real-time market price insights using simulated mandi data
- **Smart Negotiation**: AI-assisted negotiation with fair counteroffer suggestions
- **Real-time Chat**: Buyer-seller communication with automatic translation
- **Mobile-First Design**: Optimized for low-bandwidth, mobile-friendly experience
- **Price Transparency**: Market rate comparisons and trend indicators

## Target Users

- Local vendors and farmers
- Small traders and buyers
- Anyone involved in local Indian markets

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Context API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd smart-mandi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

1. **Choose User Type**: Select whether you're a buyer or seller
2. **Browse Products**: View available products with price insights
3. **Start Negotiations**: Contact vendors through the chat interface
4. **Get AI Assistance**: Receive fair price suggestions during negotiations
5. **Switch Languages**: Use the language selector for your preferred language

## AI Features

### Price Discovery
- Real-time market price analysis
- Trend indicators (up/down/stable)
- Confidence scores for price accuracy

### Smart Negotiation
- Fair price suggestions based on market data
- Context-aware negotiation responses
- Automatic counteroffer generation

### Translation
- Automatic language detection
- Real-time message translation
- Support for 8 Indian languages + English

## Project Structure

```
src/
├── components/          # React components
├── contexts/           # React context providers
├── services/           # Business logic and API services
├── types/             # TypeScript type definitions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Future Enhancements

- Integration with real mandi price APIs
- Advanced AI translation services
- Payment gateway integration
- Vendor verification system
- Mobile app development
- Offline functionality

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

---

**Smart Mandi** - Enabling fair and inclusive local trade aligned with Viksit Bharat 🇮🇳