jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

jest.mock('jose', () => {
  return {
    decodeJwt: jest.fn(() => 1)
  }
})