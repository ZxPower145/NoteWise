type HttpMethod = 'GET' | 'POST';

interface FetchConfig {
  url: string;
  method: HttpMethod;
  headers: Record<string, string>;
  body?: any;
}

class UseFetch {
  private config: FetchConfig;
  
  constructor() {
    this.config = {
      url: '',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
  
  // Add a single header
  addHeader(key: string, value: string): UseFetch {
    this.config.headers[key] = value;
    return this;
  }
  
  // Add multiple headers at once
  addHeaders(headers: Record<string, string>): UseFetch {
    this.config.headers = {
      ...this.config.headers,
      ...headers
    };
    return this;
  }
  
  // Edit an existing header
  editHeader(key: string, value: string): UseFetch {
    if (key in this.config.headers) {
      this.config.headers[key] = value;
    } else {
      throw new Error(`Header '${key}' does not exist`);
    }
    return this;
  }
  
  // Set request body
  setBody(body: any): UseFetch {
    this.config.body = typeof body === 'string' ? body : JSON.stringify(body);
    return this;
  }
  
  // Set URL
  setUrl(url: string): UseFetch {
    this.config.url = url;
    return this;
  }
  
  // Set HTTP method
  setMethod(method: HttpMethod): UseFetch {
    this.config.method = method;
    return this;
  }
  
  // Execute the fetch request
  async execute(): Promise<any> {
    try {
      const response = await fetch(this.config.url, {
        method: this.config.method,
        headers: this.config.headers,
        body: this.config.body
      });
      
      return response
      
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
  
  // Get current configuration
  getConfig(): FetchConfig {
    return { ...this.config };
  }
}

export default UseFetch
