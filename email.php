<?php
require_once 'mandrill-api-php/src/Mandrill.php'; //Not required with Composer

$email = $_POST['email-address'];
$pdflink = $_POST['pdfURL'];

try {
	$mandrill = new Mandrill('KvGT5wo3xEHIwA6A5zH87g');
	$template_name = 'cis-hardware-pdf-sent';
	$template_content = array(
        array(
            'name' => 'PDFLink',
            'content' => '<a href="' . $pdflink . '">here</a>'
        )
    );

	$message = array(
    'subject' => 'Everything You Need to Know About ConnectIN™',
    'from_email' => 'no-reply@connectinsystem.com',
    'from_name' => 'ConnectIN System - Hardware',
    'to' => array(
      array(
        'email' => $email,
        'type' => 'to'
      )
    ),
    'headers' => array('Reply-To' => 'no-reply@connectinsystem.com')
  );

	$response = $mandrill->messages->sendTemplate($template_name, $template_content, $message);
	print_r($response);

} catch (Mandrill_Error $e) {
  return 'A Mandrill error occured: ' . get_class($e) . ' - ' . $e->getMessage();
}
