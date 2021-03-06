const decode = require("./decode");

describe("decode", () => {
  describe("basic", () => {
    const input =
      "M1DESMARAIS/LUC       EABC123 YULFRAAC 0834 226F001A0025 106>60000";
    it(`should have expected output`, () => {
      expect(decode(input)).toEqual({
        legs: [
          {
            operatingCarrierPNR: "ABC123",
            departureAirport: "YUL",
            arrivalAirport: "FRA",
            operatingCarrierDesignator: "AC",
            flightNumber: "0834",
            flightDate: "2020-08-13T00:00:00.000Z",
            compartmentCode: "F",
            seatNumber: "001A",
            checkInSequenceNumber: "0025",
            passengerStatus: "1",
          },
        ],
        passengerName: "DESMARAIS/LUC",
      });
    });
  });
  describe("random", () => {
    const input =
      "M1DESMARAIS/LUC       EABC123    FRAAC      226F001A      3B>60B1W 6225BAC 2A   1234567890 1AC AC 1234567890123    20KY^164GIWVC5EH7JNT684FVNJ91W2QA4DVN5J8K4F0L0GEQ3DF5TGBN8709HKT5D3DW3GBHFCVHMY7J5T6HFR41W2QA4DVN5J8K4F0L0GE";

    it("should have the expected output", () => {
      expect(decode(input)).toEqual({
        legs: [
          {
            operatingCarrierPNR: "ABC123",
            arrivalAirport: "FRA",
            operatingCarrierDesignator: "AC",
            flightDate: "2020-08-13T00:00:00.000Z",
            compartmentCode: "F",
            seatNumber: "001A",
            serialNumber: "1234567890",
            internationalDocumentationVerification: "1",
            marketingCarrierDesignator: "AC",
            frequentFlyerAirlineDesignator: "AC",
            frequentFlyerNumber: "1234567890123",
            freeBaggageAllowance: "20K",
            fastTrack: true,
          },
        ],
        passengerName: "DESMARAIS/LUC",
        passengerDescription: "1",
        checkInSource: "W",
        issuanceDate: "2016-08-12T00:00:00.000Z",
        documentType: "B",
        boardingPassIssuerDesignator: "AC",
        securityDataType: "1",
        securityData:
          "GIWVC5EH7JNT684FVNJ91W2QA4DVN5J8K4F0L0GEQ3DF5TGBN8709HKT5D3DW3GBHFCVHMY7J5T6HFR41W2QA4DVN5J8K4F0L0GE",
      });
    });
  });
  describe("full", () => {
    const input =
      "M2DESMARAIS/LUC       EABC123 YULFRAAC 0834 226F001A0025 14D>6181WW6225BAC 00141234560032A0141234567890 1AC AC 1234567890123    20KYLX58ZDEF456 FRAGVALH 3664 227C012C0002 12E2A0140987654321 1AC AC 1234567890123    2PCNWQ^164GIWVC5EH7JNT684FVNJ91W2QA4DVN5J8K4F0L0GEQ3DF5TGBN8709HKT5D3DW3GBHFCVHMY7J5T6HFR41W2QA4DVN5J8K4F0L0GE";

    it("should have the expected output", () => {
      expect(decode(input)).toEqual({
        legs: [
          {
            operatingCarrierPNR: "ABC123",
            departureAirport: "YUL",
            arrivalAirport: "FRA",
            operatingCarrierDesignator: "AC",
            flightNumber: "0834",
            flightDate: "2020-08-13T00:00:00.000Z",
            compartmentCode: "F",
            seatNumber: "001A",
            checkInSequenceNumber: "0025",
            passengerStatus: "1",
            airlineNumericCode: "014",
            serialNumber: "1234567890",
            internationalDocumentationVerification: "1",
            marketingCarrierDesignator: "AC",
            frequentFlyerAirlineDesignator: "AC",
            frequentFlyerNumber: "1234567890123",
            freeBaggageAllowance: "20K",
            fastTrack: true,
            airlineInfo: "LX58Z",
          },
          {
            operatingCarrierPNR: "DEF456",
            departureAirport: "FRA",
            arrivalAirport: "GVA",
            operatingCarrierDesignator: "LH",
            flightNumber: "3664",
            flightDate: "2020-08-14T00:00:00.000Z",
            compartmentCode: "C",
            seatNumber: "012C",
            checkInSequenceNumber: "0002",
            passengerStatus: "1",
            airlineNumericCode: "014",
            serialNumber: "0987654321",
            internationalDocumentationVerification: "1",
            marketingCarrierDesignator: "AC",
            frequentFlyerAirlineDesignator: "AC",
            frequentFlyerNumber: "1234567890123",
            freeBaggageAllowance: "2PC",
            fastTrack: false,
            airlineInfo: "WQ",
          },
        ],
        passengerName: "DESMARAIS/LUC",
        passengerDescription: "1",
        checkInSource: "W",
        boardingPassIssuanceSource: "W",
        issuanceDate: "2016-08-12T00:00:00.000Z",
        documentType: "B",
        boardingPassIssuerDesignator: "AC",
        baggageTagNumber: "0014123456003",
        securityDataType: "1",
        securityData:
          "GIWVC5EH7JNT684FVNJ91W2QA4DVN5J8K4F0L0GEQ3DF5TGBN8709HKT5D3DW3GBHFCVHMY7J5T6HFR41W2QA4DVN5J8K4F0L0GE",
      });
    });
  });
  describe("empty first leg", () => {
    const input =
      "M2DESMARAIS/LUC       E                                   06>60000ABC123 YULFRAAC 0834 226F001A0025 10200";

    it("should have the expected output", () => {
      expect(decode(input)).toEqual({
        legs: [
          {},
          {
            operatingCarrierPNR: "ABC123",
            departureAirport: "YUL",
            arrivalAirport: "FRA",
            operatingCarrierDesignator: "AC",
            flightNumber: "0834",
            flightDate: "2020-08-13T00:00:00.000Z",
            compartmentCode: "F",
            seatNumber: "001A",
            checkInSequenceNumber: "0025",
            passengerStatus: "1",
          },
        ],
        passengerName: "DESMARAIS/LUC",
      });
    });
  });
});
