<?php

if($_POST['anti-spam'] == 'true') {

    // на всякий
    $data = array_map ( 'htmlspecialchars' , $_POST );

    require_once __DIR__ . '/vendor/autoload.php';

    $sitename = "Millennium House";

    $mail = new PHPMailer();

    $body = '<h1>Заявка с сайта '.$sitename.'</h1>';
    $body .= '<p>Имя: '.$data['name'].'</p>';
    $body .= '<p>E-mail: '.$data['email'].'</p>';
    $body .= '<p>Телефон: '.$data['phone'].'</p>';
    $body .= '<p>Площадь от: '.$data['area-before'].' до '.$data['area-after'].'</p>';
    $body .= '<p>Кол-во сотрудников от: '.$data['emp-before'].' до '.$data['emp-after'].'</p>';

    $domain_adress = "name@yourdomain.com";
    $address = "whoto@otherdomain.com";

    $mail->AddReplyTo($domain_adress, "First Last");
    $mail->SetFrom($domain_adress, 'First Last');
    $mail->AddAddress($address, "John Doe");
    $mail->Subject = "Заявка с сайта $sitename";
    $mail->MsgHTML($body);

    if (!$mail->Send()) {
        echo json_encode(array('send' => 'false'));
    } else {
        echo json_encode(array('send' => 'true'));
    }
}