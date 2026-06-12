import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;

public class AddFriendDialog extends JDialog {

    private JTextField nameField;
    private List<JTextField> startFields;
    private List<JTextField> endFields;
    private List<JTextField> dismissFields;
    private final String[] DAYS = {"M", "T", "W", "TH", "F", "S"};
    private boolean succeeded = false;
    private Friend newFriend = null;

    public AddFriendDialog(Frame parent) {
        this(parent, null);
    }

    public AddFriendDialog(Frame parent, Friend friendToEdit) {
        super(parent, friendToEdit == null ? "Add Friend" : "Edit Friend", true);
        setSize(450, 700);
        setLayout(new BorderLayout());
        setLocationRelativeTo(parent);

        startFields = new ArrayList<>();
        endFields = new ArrayList<>();
        dismissFields = new ArrayList<>();

        JPanel topPanel = new JPanel(new BorderLayout());
        topPanel.setBackground(new Color(50, 50, 50));
        topPanel.setBorder(new EmptyBorder(10, 10, 10, 10));
        
        JButton btnCancel = new JButton("Cancel");
        styleNavButton(btnCancel);
        btnCancel.addActionListener(e -> dispose());

        JLabel titleLabel = new JLabel(friendToEdit == null ? "Add Friend" : "Edit Friend", SwingConstants.CENTER);
        titleLabel.setForeground(Color.WHITE);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 16));

        JButton btnSave = new JButton("Save");
        styleNavButton(btnSave);
        btnSave.addActionListener(new SaveAction());

        topPanel.add(btnCancel, BorderLayout.WEST);
        topPanel.add(titleLabel, BorderLayout.CENTER);
        topPanel.add(btnSave, BorderLayout.EAST);
        add(topPanel, BorderLayout.NORTH);

        JPanel mainContent = new JPanel();
        mainContent.setLayout(new BoxLayout(mainContent, BoxLayout.Y_AXIS));
        mainContent.setBorder(new EmptyBorder(15, 15, 15, 15));
        mainContent.setBackground(new Color(245, 245, 245));

        JPanel namePanel = new JPanel(new BorderLayout(10, 10));
        namePanel.setBackground(new Color(245, 245, 245));
        namePanel.setMaximumSize(new Dimension(2000, 40));
        
        JLabel nameLbl = new JLabel("Friend's Name:");
        nameLbl.setFont(new Font("Arial", Font.BOLD, 13));
        
        nameField = new JTextField();
        nameField.setFont(new Font("Arial", Font.PLAIN, 14));
        
        namePanel.add(nameLbl, BorderLayout.WEST);
        namePanel.add(nameField, BorderLayout.CENTER);
        
        mainContent.add(namePanel);
        mainContent.add(Box.createVerticalStrut(20));

        for (String day : DAYS) {
            mainContent.add(createDayRow(day));
            mainContent.add(Box.createVerticalStrut(10));
        }

        JScrollPane scrollPane = new JScrollPane(mainContent);
        scrollPane.getVerticalScrollBar().setUnitIncrement(16);
        scrollPane.setBorder(null);
        add(scrollPane, BorderLayout.CENTER);

        if (friendToEdit != null) {
            prefillData(friendToEdit);
        }
    }

    private JPanel createDayRow(String day) {
        JPanel panel = new JPanel(new GridBagLayout());
        panel.setBackground(Color.WHITE);
        TitledBorder border = BorderFactory.createTitledBorder(
            BorderFactory.createLineBorder(Color.LIGHT_GRAY), 
            getFullDayName(day)
        );
        border.setTitleFont(new Font("Arial", Font.BOLD, 12));
        panel.setBorder(border);

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        gbc.gridx = 0; gbc.gridy = 0; gbc.weightx = 0;
        JLabel lblLunch = new JLabel("Lunch:");
        lblLunch.setForeground(Color.GRAY);
        panel.add(lblLunch, gbc);

        gbc.gridx = 1; gbc.weightx = 0.4;
        JTextField txtStart = new JTextField();
        txtStart.setToolTipText("Start");
        startFields.add(txtStart); 
        panel.add(txtStart, gbc);

        gbc.gridx = 2; gbc.weightx = 0;
        panel.add(new JLabel("-"), gbc);

        gbc.gridx = 3; gbc.weightx = 0.4;
        JTextField txtEnd = new JTextField();
        txtEnd.setToolTipText("End");
        endFields.add(txtEnd); 
        panel.add(txtEnd, gbc);

        gbc.gridx = 0; gbc.gridy = 1; gbc.weightx = 0;
        JLabel lblDismiss = new JLabel("Dismissal:");
        lblDismiss.setForeground(Color.GRAY);
        panel.add(lblDismiss, gbc);

        gbc.gridx = 1; gbc.gridwidth = 3; gbc.weightx = 1.0;
        JTextField txtDismiss = new JTextField();
        dismissFields.add(txtDismiss); 
        panel.add(txtDismiss, gbc);

        return panel;
    }

    private void prefillData(Friend f) {
        nameField.setText(f.getName());

        for (int i = 0; i < DAYS.length; i++) {
            String day = DAYS[i];
            if (f.hasClassOn(day)) {
                Friend.Schedule s = f.getScheduleForDay(day);
                startFields.get(i).setText(s.getLunchStart());
                endFields.get(i).setText(s.getLunchEnd());
                dismissFields.get(i).setText(s.getDismissalTime());
            }
        }
    }

    private String getFullDayName(String shortDay) {
        switch (shortDay) {
            case "M": return "Monday";
            case "T": return "Tuesday";
            case "W": return "Wednesday";
            case "TH": return "Thursday";
            case "F": return "Friday";
            case "S": return "Saturday";
            default: return shortDay; 
        }
    }

    private void styleNavButton(JButton btn) {
        btn.setForeground(Color.WHITE);
        btn.setBackground(new Color(50, 50, 50));
        btn.setBorderPainted(false);
        btn.setFocusPainted(false);
        btn.setOpaque(true);
    }

    public Friend getNewFriend() { return newFriend; }
    public boolean isSucceeded() { return succeeded; }

    private class SaveAction implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            try {
                String name = nameField.getText().trim();
                if (name.isEmpty()) {
                    throw new IllegalArgumentException("Name is required!");
                }

                newFriend = new Friend(name);
                boolean hasAtLeastOneDay = false;

                for (int i = 0; i < DAYS.length; i++) {
                    String start = startFields.get(i).getText().trim();
                    String end = endFields.get(i).getText().trim();
                    String dism = dismissFields.get(i).getText().trim();

                    if (!start.isEmpty() || !end.isEmpty() || !dism.isEmpty()) {
                        if (start.isEmpty()) {
                            throw new IllegalArgumentException("Please enter a Start Time for " + getFullDayName(DAYS[i]));
                        }
                        if ((!start.isEmpty() && !start.matches(".*\\d.*")) || 
                            (!end.isEmpty() && !end.matches(".*\\d.*")) || 
                            (!dism.isEmpty() && !dism.matches(".*\\d.*"))) {
                            throw new IllegalArgumentException("Times for " + getFullDayName(DAYS[i]) + " must contain numbers (e.g. 12:00).");
                        }
                        newFriend.addSchedule(DAYS[i], start, end, dism);
                        hasAtLeastOneDay = true;
                    }
                }

                if (!hasAtLeastOneDay) {
                    throw new IllegalArgumentException("Please enter a schedule for at least one day.");
                }

                succeeded = true;
                dispose();

            } catch (Exception ex) {
                JOptionPane.showMessageDialog(AddFriendDialog.this, 
                    "Error: " + ex.getMessage(), "Input Error", JOptionPane.ERROR_MESSAGE);
            }
        }
    }
}