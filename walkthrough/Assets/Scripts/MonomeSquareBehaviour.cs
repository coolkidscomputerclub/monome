using UnityEngine;
using System.Collections;
using LitJson;
using System.Text;

public class MonomeSquareBehaviour : MonoBehaviour {
	
	public int id;
	public int state = 0;
	private Color32[] colours = new Color32[4];
	private Color32 highlightColour = new Color32(200,200,200,255);
	private GameObject monome;
	
	// Use this for initialization
	void Start () {
		colours[0] = new Color32(100,100,100,255);
		colours[1] = new Color32(129,208,224,255);
		colours[2] = new Color32(244,83,85,255);
		colours[3] = new Color32(102,198,140,255);
		monome = GameObject.Find("Monome");
	}
	
	// Update is called once per frame
	void Update () {
	}
	
	void Highlight () {
		if (state == 0) {
			renderer.material.color = highlightColour;
		}
	}
	
	void UnHighlight () {
		if (state == 0) {
			renderer.material.color = colours[0];
		}
	}
	
	void SetID (int myID) {
		id = myID;
	}
	
	void SetState (int col) {
		if (col > -1) {
			renderer.material.color = colours[col];
			state = col;
		}
	}
	
	void Activate (int s) {
		renderer.material.color = colours[s];
		state = s;
		
		StringBuilder sb = new StringBuilder();
        JsonWriter writer = new JsonWriter(sb);
		writer.WriteObjectStart();
        writer.WritePropertyName("id");
        writer.Write(id);
		writer.WritePropertyName("state");
		writer.Write(1);
        writer.WriteObjectEnd();
		
		monome.SendMessage("SendToSaul", sb.ToString());
	}
	
	void Deactivate () {
		state = 0;
		renderer.material.color = colours[0];
		
		StringBuilder sb = new StringBuilder();
        JsonWriter writer = new JsonWriter(sb);
		writer.WriteObjectStart();
        writer.WritePropertyName("id");
        writer.Write(id);
		writer.WritePropertyName("state");
		writer.Write(0);
        writer.WriteObjectEnd();
		
		monome.SendMessage("SendToSaul", sb.ToString());
	}
	
	void OnTriggerEnter (Collider col) {
		// Debug.Log ("Standing on #" + id);
		Activate(1);
	}
	
	void OnTriggerExit (Collider col) {
		Deactivate();
	}
	
}
