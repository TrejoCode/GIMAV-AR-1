package com.example.gqr;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import android.widget.Toast;

import com.google.android.gms.vision.barcode.Barcode;

import java.util.regex.Pattern;

import retrofit2.http.Url;


public class MainActivity extends AppCompatActivity {

    Button scanbtn;
    TextView result;

    public static final int REQUEST_CODE = 100;
    public static final int PERMISSION_REQUEST = 200;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        scanbtn = (Button) findViewById(R.id.scanbtn);
        result = (TextView) findViewById(R.id.result);

        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, PERMISSION_REQUEST);
        }
        /* Este es un intent explicito lo que hace es que te lleva  a la clase ScanActivity despues de que es apretado el boton de escanear */
        scanbtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, ScanActivity.class);
                startActivityForResult(intent, REQUEST_CODE); //Aqui se ejecula la accion del intent
            }
        });


    }

    @Override
    protected void onActivityResult(int requestCode, final int resultCode, @Nullable Intent data) {
        if (requestCode == REQUEST_CODE && resultCode == RESULT_OK) {
            if (data != null) {
                final Barcode barcode = data.getParcelableExtra("barcode");
                if(Patterns.WEB_URL.matcher(barcode.displayValue).matches()){
                result.post(new Runnable() {
                    @Override
                    public void run() {
                        result.setText(barcode.displayValue);
                    }
                });
                }
                else{
                    Toast.makeText(getApplicationContext(), "Este codigo no tiene una URL valida", Toast.LENGTH_LONG).show();
                    Log.d("response", "La URL no existe");
                }
                //aqui el textView donde esta la respuesta del QR al hacerle click abre en el navegador
                result.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(barcode.displayValue));
                            startActivity(intent);
                    }
                });
            }
        }
    }

}
