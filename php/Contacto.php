<?php
const API_URL = 'https://api.mailjet.com/v3.1/send';
const API_KEY = '6fb0f988c18f5dfddf39c8ffefaa3ac0'; 
const API_SECRET = '54178208f89be9805baadbad77214506'; 


function send_email($user_name, $user_email, $subject, $message) {
    $payload = [
        'Messages' => [
            [
                'From' => [
                    'Email' => $user_email,
                    'Name' => $user_name
                ],
                'To' => [
                    [
                        'Email' => 'camposj93@gmail.com',
                        'Name' => 'Jesus Campos'
                    ]
                ],
                'Subject' => $subject,
                'TextPart' => strip_tags($message),
                'HTMLPart' => nl2br($message)
            ]
        ]
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, API_URL);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, API_KEY . ':' . API_SECRET);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return ['data' => json_decode($result, true), 'status' => $httpCode];
}


// Recibir datos del formulario por POST
$user_name = isset($_POST['name']) ? $_POST['name'] : '';
$user_email = isset($_POST['email']) ? $_POST['email'] : '';
$subject = isset($_POST['subject']) ? $_POST['subject'] : 'Nuevo mensaje de contacto';
$message = isset($_POST['message']) ? $_POST['message'] : '';

$data = null;
$status = null;
if ($user_name && $user_email && $message) {
    $result = send_email($user_name, $user_email, $subject, $message);
    $data = $result['data'];
    $status = $result['status'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mailjet API</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center">Mailjet API</h1>
        <div class="row mt-4">
            <div class="col-md-12">
                <h2>API Response (Status: <?php echo $status; ?>)</h2>
                <pre><?php print_r($data); ?></pre>
            </div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>