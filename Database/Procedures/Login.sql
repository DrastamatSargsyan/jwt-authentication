CREATE PROCEDURE Login
	@Username VARCHAR(50) = null
AS
	SET NOCOUNT ON

	SELECT Id, Username, Password, Email
	FROM Users 
	WHERE Username = ISNULL(@Username, Username)
GO
